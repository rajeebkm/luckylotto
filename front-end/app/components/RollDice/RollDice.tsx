"use client";
import { useState } from "react";
import Web3 from "web3";
declare global {
    interface Window {
        ethereum: any;
    }
}
const ethereum = window.ethereum;
import { useAccount } from 'wagmi';
import toast from "react-hot-toast";
import { ROLL_DICE_ABI, ROLL_DICE_ADDRESS } from "../../../constant/index";
export const web3 = new Web3(ethereum);

const RollDiceGame = () => {
    const [stakeAmount, setStakeAmount] = useState<number | null>(null);
    const [outcome, setOutcome] = useState<string>("");
    const [diceResult1, setDiceResult1] = useState<number | null>(null);
    const [diceResult2, setDiceResult2] = useState<number | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [isResultShown, setIsResultShown] = useState(false);
    const [isWinner, setIsWinner] = useState<boolean | null>(null);
    const [result, setResult] = useState<number | null>(null);

    const { isConnected, address } = useAccount();
    const contract = new web3.eth.Contract(ROLL_DICE_ABI as any, ROLL_DICE_ADDRESS);

    const rollDice = async () => {
        if (!isConnected) {
            toast.error("Please connect your wallet!");
            return;
        }

        if (!stakeAmount || !outcome) {
            toast.error("Please select a stake amount and an outcome!");
            return;
        }

        try {
            setIsRolling(true);
            setIsResultShown(false);
            setIsWinner(null);

            const choice = outcome === "greater" ? 0 : 1;
            const stakeValue = web3.utils.toWei(stakeAmount.toString(), "ether");

            toast.loading("Waiting for transaction...");
            const tsxRequestId = await contract.methods
                .initiateRoll(choice, false)
                .send({ from: address, value: stakeValue });

            toast.dismiss();
            toast.success("Bet placed successfully! Waiting for result...");

            const requestId = tsxRequestId.events["RequestSent"]["returnValues"][0];
            setStakeAmount(null);
            setOutcome("");

            try {
                const fetchRollStatus = async () => {
                    while (true) {
                        const tsxRollData = await contract.methods.rollStatuses(requestId).call();
                        console.log("tsxRollData:", tsxRollData);
                        if (tsxRollData[1] !== 0 && tsxRollData[2] !== 0) {
                            return tsxRollData;
                        }
                        await new Promise((resolve) => setTimeout(resolve, 10000));
                    }
                };

                const tsxRollData = await fetchRollStatus();
                setDiceResult1(tsxRollData[1]);
                setDiceResult2(tsxRollData[2]);

                const result = Number(tsxRollData[1]) + Number(tsxRollData[2]);
                setResult(result);

                if (tsxRollData[4]) {
                    setIsWinner(true);
                    toast.success("You won the bet!");
                } else {
                    setIsWinner(false);
                    toast.error("You lost the bet!");
                }

                setIsResultShown(true);
            } catch (resultError) {
                console.error("Error fetching dice results:", resultError);
                toast.error("Failed to fetch dice results. Please try again.");
            }
        } catch (error: any) {
            console.error("Error initiating roll:", error);
            toast.error(error.message || "Transaction failed. Please try again.");
        } finally {
            setIsRolling(false);
            toast.dismiss();
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
                backgroundImage: 'url("/roll-dice-bg.jpg")',
                filter: "blur(8px)",
            }}
        ></div>
        <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 flex items-center font-arcade justify-center z-0">
            <div className="flex items-center gap-40">
                <div className="flex flex-col items-center text-white text-4xl font-bold mt-6 z-0">
                    <div className="flex flex-row gap-4 items-center z-10">
                        <div className="bg-gradient-to-b from-pink-500 to-purple-700 w-24 h-24 flex items-center justify-center rounded-lg shadow-lg mb-4">
                            <p className="text-white text-5xl font-bold">{isResultShown ? diceResult1 : "?"}</p>
                        </div>
                        <div className="bg-gradient-to-b from-pink-500 to-purple-700 w-24 h-24 flex items-center justify-center rounded-lg shadow-lg mb-4">
                            <p className="text-white text-5xl font-bold">{isResultShown ? diceResult2 : "?"}</p>
                        </div>
                    </div>
                    <p>Roll Dice</p>
                </div>
                <div className="bg-gradient-to-b from-pink-500 to-purple-700 p-12 rounded-2xl shadow-2xl w-120 z-0">
                    <h2 className="text-white text-3xl font-bold mb-6 text-center tracking-wide">
                        Stake Your Bet, Win Double!
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[0.000001, 0.05, 0.1, 0.5, 0.8, 1].map((amount) => (
                            <button
                                key={amount}
                                onClick={() => setStakeAmount(amount)}
                                className={`py-3 px-2 rounded-lg text-lg font-bold ${stakeAmount === amount
                                    ? "bg-yellow-400 text-purple-900"
                                    : "bg-purple-800 text-white hover:bg-purple-900"
                                    }`}
                            >
                                {amount} ETH
                            </button>
                        ))}
                    </div>

                    <h2 className="text-white text-3xl font-bold mb-6 mt-6 text-center tracking-wide">
                        Outcome
                    </h2>
                    <div className="flex justify-center item-center flex-row gap-8 mb-6">
                        <button
                            onClick={() => setOutcome("greater")}
                            className={`py-3 px-8 rounded-lg text-lg font-bold ${outcome === "greater"
                                ? "bg-yellow-400 text-purple-900"
                                : "bg-purple-800 text-white hover:bg-purple-900"
                                }`}
                        >
                            Greater than 6
                        </button>
                        <button
                            onClick={() => setOutcome("less")}
                            className={`py-3 px-9 rounded-lg text-lg font-bold ${outcome === "less"
                                ? "bg-yellow-400 text-purple-900"
                                : "bg-purple-800 text-white hover:bg-purple-900"
                                }`}
                        >
                            Less than 6
                        </button>
                    </div>

                    <button
                        onClick={rollDice}
                        disabled={isRolling}
                        className={`w-full py-3 rounded-lg text-white text-xl font-bold uppercase tracking-wide shadow-lg transition ${isRolling
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-400"
                            }`}
                    >
                        {isRolling ? "Rolling..." : "Roll"}
                    </button>
                </div>
            </div>
        </div>

        {isResultShown && (
            <div
                className={`absolute inset-0 flex justify-center items-center z-40 bg-black bg-opacity-50`}
            >
                <div
                    className={`p-8 rounded-lg shadow-2xl text-white font-arcade transition-transform transform ${isWinner
                        ? "bg-gradient-to-b from-green-500 to-green-700"
                        : "bg-gradient-to-b from-red-500 to-red-700"
                        }`}
                    style={{
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                        animation: "fadeIn 0.5s ease-out",
                    }}
                >
                    <h3 className="text-3xl font-extrabold mb-4 text-center">
                        {isWinner ? "Congratulations!" : "Better Luck Next Time!"}
                    </h3>
                    <p className="text-lg mb-2 text-center">You rolled a total of:</p>
                    <p className="text-5xl font-extrabold text-center">{result}</p>
                    <p className="mt-4 text-center">
                        {isWinner
                            ? "You won your bet and doubled your stake!"
                            : "You lost your bet. Try again for another chance!"}
                    </p>
                </div>
            </div>
        )}
    </main>
    );
};

export default RollDiceGame;
