
import { useAccount } from 'wagmi';
import {
  FundButton,
  getOnrampBuyUrl
} from '@coinbase/onchainkit/fund';
import { WalletDefault } from '@coinbase/onchainkit/wallet';

export function FundOnchainKit() {
  const projectId = 'YOUR_CDP_PROJECT_ID';
  const { address } = useAccount();

  const onrampBuyUrl = getOnrampBuyUrl({
    projectId,
    addresses: { [address as any]: ['base'] },
    assets: ['USDC'],
    presetFiatAmount: 20,
    fiatCurrency: 'USD'
  });

  return (
    <>
      {address ? (
        <FundButton fundingUrl={onrampBuyUrl} />
      ) : (
        <WalletDefault />
      )}
    </>
  )
}
