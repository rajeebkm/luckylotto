import { expect } from "chai"
import { contracts } from "../typechain-types"
import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { ethers, upgrades, network } from "hardhat"
import { networkConfig, testNetworkChains } from "../helper-hardhat-config"
const helpers = require("@nomicfoundation/hardhat-network-helpers")
import { setupContracts } from "./testSetup"

describe("Dice Game", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {
        const accounts = await ethers.getSigners()
        const contracts = await setupContracts()
        return { contracts, accounts }
    }

    describe("Deployment", function () {
        it("should create a duel successfully", async function () {
            const { contracts, accounts } = await loadFixture(deploy)
            const luckyDiceRoll: any = await contracts.LuckyDiceRoll.LuckyDiceRollContract.attach(contracts.LuckyDiceRoll.LuckyDiceRollAddress)
            const s_subscriptionId = await luckyDiceRoll.s_subscriptionId()
            expect(s_subscriptionId).to.equal(process.env.CHAINLINK_SUBSCRIPTION_ID)
      
        })
    })

})