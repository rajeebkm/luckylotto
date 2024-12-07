export interface networkConfigItem {
    chainId: number
    goldskySlug?: string
    deployer: string
    usdc?: string
    usdcAdmin?: string
    bot?: string
    protocolTreasury?: string
    StartBlock?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    hardhat: {
        chainId: 31337,
        goldskySlug: "hardhat",
        deployer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        usdcAdmin: "",
        bot: "",
        protocolTreasury: ""
    },
    localhost: {
        chainId: 31337,
        goldskySlug: "localhost",
        deployer: "",
        usdcAdmin: "",
        bot: "",
        protocolTreasury: ""
    },
    baseSepolia: {
        chainId: 84532,
        goldskySlug: "",
        deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
        usdcAdmin: "",
        bot: "",
        protocolTreasury: ""
    },
    seiTestnet: {
        chainId: 1328,
        goldskySlug: "sei-testnet",
        deployer: "",
        usdcAdmin: "",
        bot: "",
        protocolTreasury: ""
    },
}

export const forkedChain = ["localhost"]
export const testNetworkChains = [""]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
