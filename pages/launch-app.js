import { abi } from '../public/contract-abi'

import dynamic from 'next/dynamic';

import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
  getAllPosts,
  formatDate,
  generateDisplayDate,
} from "@urbit/foundation-design-system";
import Footer from "../components/Footer";
import Header from "../components/Header";

import * as React from 'react';
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

// const projectId = process.env.WALLET_CONNECT_PROJECT_ID;
const projectId = 'Hello';

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'Rainbowkit Demo' }),
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


const contractConfig = {
  address: '0xB73a1Ac42858603FC18eF2F2729a05c1B5379691',
  abi,
};

// const TVChartContainer = dynamic(
// 	() =>
// 		import('../components/TVChartContainer').then(mod => mod.TVChartContainer),
// 	{ ssr: false },
// );

export default function App() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <Container>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
      <WalletInfo />
      </RainbowKitProvider>
    </WagmiConfig>
    </Container>
  );
}

function WalletInfo() {
    const { isConnected } = useAccount();

    // https://stackoverflow.com/a/75365001
    const [connectionStat, setConnectionStat] = React.useState();
    React.useEffect(() => {
        setConnectionStat(isConnected);
    }, [isConnected])

    const { config: contractWriteConfig } = usePrepareContractWrite({
        ...contractConfig,
        functionName: 'mint',
    });

    const {
        data: mintData,
        write: mint,
        isLoading: isMintLoading,
        isSuccess: isMintStarted,
        error: mintError,
    } = useContractWrite(contractWriteConfig);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <Header  />

        <Section>
        <h1>
        Quantum Leap Financials Entanglement Fund (QEF)
        </h1>

        <div className="grid w-full grid-cols-1 pt-12 justify-items-end">
        <div> <ConnectButton /> </div>
        </div>

        {connectionStat && (
        <div className="pt-12">
            <button type="button"
            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg"
            onClick={() => mint?.()}>
            Mint
            </button>
        </div>
        )}

        </Section>

        <Section>
        Radar chart
        </Section>


        </main>
    )
}
