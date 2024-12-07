import { ethers, upgrades, network } from "hardhat"
import { networkConfig, testNetworkChains } from "../helper-hardhat-config"
import fs from "fs"

const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }

export const setupContracts = async () => {
    let tx, txr, usdAddress, USDC
    let tokenA: any
    let tokenB: any
    let mockOracleA: any
    let mockOracleB: any
    const accounts = await ethers.getSigners()
    const networkName = network.name
    const owner = accounts[0].address
    const deployer = networkConfig[networkName].deployer

    if (deployer?.toLowerCase() !== owner.toLowerCase()) {
        throw Error("Deployer must be the Owner")
    }
    // console.log(owner)

    const protocolTreasury = networkConfig[networkName].protocolTreasury
    const bot = accounts[5].address

    // Deploy USDC and other Tokens contract
    const startBlock: any = await ethers.provider.getBlock("latest")
    // console.log(startBlock!.number)
    if (networkName === "seiMainnet") {
        usdAddress = { target: networkConfig[networkName].usdc }
    } else {
        USDC = await ethers.getContractFactory("LuckyLottoUSDC")
        const usdcNew = await upgrades.deployProxy(USDC, [
            "LuckyLottoUSDC",
            "LuckyLottoUSDC",
            networkConfig[networkName].usdcAdmin
        ])
        let LuckyLottoUSDC = await usdcNew.waitForDeployment()
        // console.log("USDC deployed to:", LuckyLottoUSDC.target)
        usdAddress = LuckyLottoUSDC.target
    }

    const CHAINLINK_SUSCIPTION_ID = process.env.CHAINLINK_SUSCIPTION_ID;

    const LuckyDiceRoll = await ethers.getContractFactory("LuckyDiceRoll");
    const luckyDiceRoll = await LuckyDiceRoll.deploy(CHAINLINK_SUSCIPTION_ID)
    console.log("LuckyDiceRoll deployed to:", luckyDiceRoll.target)


    // Deploy mock tokens for the duel
    const TokenAMock = await ethers.getContractFactory("MockERC20")
    tokenA = await TokenAMock.deploy("Token A", "TKA", 18)
    await tokenA.waitForDeployment()

    const TokenBMock = await ethers.getContractFactory("MockERC20")
    tokenB = await TokenBMock.deploy("Token B", "TKB", 18)
    await tokenB.waitForDeployment()

    const MockOracleFactoryA = await ethers.getContractFactory("MockOracle")
    mockOracleA = await MockOracleFactoryA.deploy()
    await mockOracleA.waitForDeployment()

    await mockOracleA.setPrice(1500)

    const MockOracleFactoryB = await ethers.getContractFactory("MockOracle")
    mockOracleB = await MockOracleFactoryB.deploy()
    await mockOracleB.waitForDeployment()

    await mockOracleB.setPrice(2000)


    let contracts = {
        USDC: {
            usdAddress: usdAddress,
            usdcContract: USDC
        },
        LuckyDiceRoll: { LuckyDiceRollAddress: luckyDiceRoll.target, LuckyDiceRollContract: LuckyDiceRoll },
        Bot: { bot: accounts[5] },
        ProtocolTreasury: { protocolTreasury: protocolTreasury },
        TokenA: { tokenA: tokenA.target, tokenAContract: tokenA },
        TokenB: { tokenB: tokenB.target, tokenBContract: tokenB }
    }

    return contracts
}
