
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'jZskxaGN7W6MMKveKkMQV15rzBqGf7S7ptSyVHGj4MoS7UL',
    secret: process.env.NEXT_PUBLIC_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'luckylotto',
    hash: '0xa67b5328b35a4abce5a2d68f0f897c595bfff461994818c0b99e00c5d316b48b'
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
}
  