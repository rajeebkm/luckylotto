import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@openzeppelin/hardhat-upgrades"
import "./tasks"
import * as dotenv from "dotenv"
import "solidity-docgen"
import "hardhat-abi-exporter"
import "hardhat-contract-sizer"
dotenv.config()

const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN || ""
const SEITRACE_API_KEY = process.env.SEITRACE_API_KEY || ""

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.26",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            viaIR: true
        }
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337
        },
        localhost: {
            chainId: 31337,
            forking: {
                url: `https://base-sepolia.infura.io/v3/${process.env.INFURA_KEY}`
            }
        },
        baseSepolia: {
            url: `https://base-sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
            chainId: 84532,
            accounts: [PRIVATE_KEY_ADMIN]
        },
    },
    abiExporter: {
        path: "./constants/abis",
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 4,
        only: [
            "LuckyLottoUSDC",
            "LuckyDiceRoll"
        ]
    },
    sourcify: {
        enabled: false
    },
    etherscan: {
        apiKey: {
            seiTestnet: SEITRACE_API_KEY
        },
        customChains: [
            {
                network: "seiTestnet",
                chainId: 1328,
                urls: {
                    apiURL: "https://seitrace.com/atlantic-2/api",
                    browserURL: "https://seitrace.com"
                }
            }
        ]
    },
    docgen: {
        outputDir: "./docs",
        pages: "files",
        collapseNewlines: true
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: false,
        strict: true
        // only: [":ERC20$"]
    }
}

export default config
