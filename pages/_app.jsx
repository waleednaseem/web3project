import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://cloudflare-eth.com`,
      }),
    }),
    publicProvider()
  ]
);
// https://mainnet.infura.io/v3/0b3aa2b530f741ab8521a93cb5302f93
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
