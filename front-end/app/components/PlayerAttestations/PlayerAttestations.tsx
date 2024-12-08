"use client";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { ROLL_DICE_ABI, ROLL_DICE_ADDRESS } from "../../../constant/index";
import { Bool, Text, Schema, U32, U64 } from "@truenetworkio/sdk";
import { getTrueNetworkInstance } from "../../../true-network/true.config";

export const web3 = new Web3(window.ethereum);

const luckyLottoSchema = Schema.create({
    stakeAmount: U64,
    outcome: Text,
    diceResult1: U32,
    diceResult2: U32,
    totalRollResult: U32,
    isWinner: Bool,
    transactionId: Text,
    playerAddress: Text,
});

function PlayerAttestation() {
    const { address, isConnected } = useAccount();
    const [loading, setLoading] = useState(false);
    const [stakeAmount, setStakeAmount] = useState<number | null>(null);
    const [outcome, setOutcome] = useState<string>("");
    const [diceResult1, setDiceResult1] = useState<number | null>(null);
    const [diceResult2, setDiceResult2] = useState<number | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [isWinner, setIsWinner] = useState<boolean | null>(null);
    const [requestId, setRequestId] = useState<string>(""); // User-provided request ID.

    const contract = new web3.eth.Contract(ROLL_DICE_ABI as any, ROLL_DICE_ADDRESS);

    // Fetch the roll status based on requestId
    const fetchRollStatus = async () => {
        if (!requestId) {
            toast.error("Please enter a valid Request ID.");
            return;
        }

        try {
            setLoading(true);
            const rollData = await contract.methods.rollStatuses(requestId).call();
            console.log("Roll Data:", rollData);

            if (rollData[1] !== "0" && rollData[2] !== "0") {
                setDiceResult1(Number(rollData[1]));
                setDiceResult2(Number(rollData[2]));
                const total = Number(rollData[1]) + Number(rollData[2]);
                setResult(total);
                setIsWinner(total >= 7); // Assuming a roll ≥ 7 wins.
                setOutcome(total >= 7 ? "Win" : "Lose");
            } else {
                toast.error("No roll results found for this Request ID.");
            }
        } catch (error) {
            console.error("Error fetching roll status:", error);
            toast.error("Failed to fetch roll status.");
        } finally {
            setLoading(false);
        }
    };

    // Attest data using TrueNetwork
    const luckyLottoPlayToUser = async () => {
        if (!address || !requestId) {
            toast.error("Wallet or Request ID is missing!");
            return;
        }

        try {
            setLoading(true);
            const api = await getTrueNetworkInstance();

            const attestationData = {
                stakeAmount: stakeAmount || 0,
                outcome: outcome || "N/A",
                diceResult1: diceResult1 || 0,
                diceResult2: diceResult2 || 0,
                totalRollResult: result || 0,
                isWinner: isWinner || false,
                transactionId: requestId,
                playerAddress: address,
            };

            console.log("Attesting Data:", attestationData);

            const output = await luckyLottoSchema.attest(api, "i2hb18ZWv1NsGXxjCZZmr6zneFNhzvmmwtmqEqcogbnumCe", attestationData);
            console.log("Attestation Output:", output);

            toast.success("Data attested successfully!");
        } catch (error) {
            console.error("Error during attestation:", error);
            toast.error("Failed to attest data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-arcade bg-gradient-to-b from-purple-800 to-purple-900 flex flex-col items-center justify-center">
            {!isConnected ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                    <p className="mt-4 text-2xl font-semibold text-blue-600">
                        Connect Your Wallet
                    </p>
                    <p className="text-lg text-gray-600 mt-2">
                        To view player details, please connect your wallet.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <label htmlFor="requestId" className="block text-gray-800 mb-2">
                            Enter Request ID:
                        </label>
                        <input
                            type="text"
                            id="requestId"
                            value={requestId}
                            onChange={(e) => setRequestId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                            placeholder="Enter Request ID"
                        />
                        <button
                            onClick={fetchRollStatus}
                            className="mt-4 bg-blue-600 py-2 px-4 rounded text-white hover:bg-blue-700"
                        >
                            Fetch Roll Status
                        </button>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-4 text-gray-800">Stake Amount</th>
                                <th className="border-b p-4 text-gray-800">Outcome</th>
                                <th className="border-b p-4 text-gray-800">Dice Result 1</th>
                                <th className="border-b p-4 text-gray-800">Dice Result 2</th>
                                <th className="border-b p-4 text-gray-800">Total Roll Result</th>
                                <th className="border-b p-4 text-gray-800">Is Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-b p-4 text-gray-800">{stakeAmount || "N/A"}</td>
                                <td className="border-b p-4 text-gray-800">{outcome || "N/A"}</td>
                                <td className="border-b p-4 text-gray-800">{diceResult1 || "N/A"}</td>
                                <td className="border-b p-4 text-gray-800">{diceResult2 || "N/A"}</td>
                                <td className="border-b p-4 text-gray-800">{result || "N/A"}</td>
                                <td className="border-b p-4 text-gray-800">
                                    {isWinner === null ? "N/A" : isWinner ? "Winner" : "Loser"}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button
                        onClick={luckyLottoPlayToUser}
                        className="mt-4 bg-green-600 py-2 px-4 rounded text-white hover:bg-green-700"
                    >
                        Attest Data
                    </button>
                </>
            )}
        </div>
    );
}

export default PlayerAttestation;
