import { ethers, upgrades, network } from "hardhat"
import { updateContractsJson } from "../utils/updateContracts"
import verify from "../utils/verify"
import { networkConfig, testNetworkChains } from "../helper-hardhat-config"
import fs from "fs"
import * as dotenv from "dotenv"
dotenv.config()

const main = async () => {
    let tx, txr, usdAddress
    const accounts = await ethers.getSigners()
    const networkName = network.name
    const owner = accounts[0].address
    const deployer = networkConfig[networkName].deployer
    const CHAINLINK_SUBSCRIPTION_ID: any = process.env.CHAINLINK_SUBSCRIPTION_ID;

    if (deployer?.toLowerCase() !== owner.toLowerCase()) {
        throw Error("Deployer must be the Owner")
    }
    console.log(owner)

    const LuckyDiceRoll = await ethers.getContractFactory("LuckyDiceRoll");
    const luckyDiceRoll = await LuckyDiceRoll.deploy(CHAINLINK_SUBSCRIPTION_ID)
    await luckyDiceRoll.waitForDeployment();
    console.log("LuckyDiceRoll deployed to:", luckyDiceRoll.target)

    let contracts = [{ name: "LuckyDiceRoll", address: luckyDiceRoll.target }]

    updateContractsJson(contracts)
    console.table(contracts)

    if (
        testNetworkChains.includes(networkName) &&
        process.env.BASESCAN_API_KEY &&
        process.env.VERIFY_CONTRACTS === "true"
    ) {
        console.log("Verifying...")
        await verify(luckyDiceRoll.target.toString(), [])
    }
    console.log("🚀🚀🚀 Deployment Successful 🚀🚀🚀")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
