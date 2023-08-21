import { abi } from '../public/contract-abi'
import { lpcabi } from '../public/lpcontract-abi';

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

import { 
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite } from 'wagmi';
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
  address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  abi: abi,
};

const lpcontractConfig = {
  address: '0x65FaAC6ACbd781e7B3E799fa7f6e90b0263Fa51E',
  abi: lpcabi,
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
    const { address, isConnected } = useAccount();

    // https://stackoverflow.com/a/75365001
    const [connectionStat, setConnectionStat] = React.useState();
    React.useEffect(() => {
        setConnectionStat(isConnected);
    }, [isConnected])

    const { data: poolAddress } = useContractRead({
        ...contractConfig,
        functionName: 'getPool',
        args: ['0x65faac6acbd781e7b3e799fa7f6e90b0263fa51e000200000000000000000866'],
        watch: true,
    });

    const { data: lpBalance } = useContractRead({
        ...lpcontractConfig,
        functionName: 'balanceOf',
        args: ["0x5bC2852fEB943B4A43Fa87b275f44B45C4Ca527f"],
        watch: true,
    });
    console.log({lpBalance});


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

        <div className="flex flex-col items-center">
          <p style={{ margin: '12px 0 24px' }}>
              五五开地址: {poolAddress}
          </p>
          <p style={{ margin: '12px 0 24px' }}>
              你的lp余额: {Number(lpBalance)}
          </p>
        </div>


        </Section>

        <Section>
        Radar chart
        </Section>

        <Section>
        Welcome to Entanglement, the flagship fund offering from [Your Hedge Fund Company Name]. We are at the vanguard of financial evolution, ensuring that our investors not only navigate but also thrive in the dynamic world of digital assets.

        At the core of our philosophy is our unwavering commitment to rigorous research. Our team of seasoned professionals, backed by cutting-edge technological infrastructure, continuously delves deep into the intricate layers of the crypto universe. Our approach isn't just about riding the waves but understanding the currents that create them.

        The [Your Fund's Name] is designed for those who understand the significance of blockchain technology and the transformative power of cryptocurrencies, but desire a structured and research-driven approach to their investments. We offer broad exposure to the crypto market while also ensuring that our portfolio is refined, researched, and resilient.

        Step into the future of investing with [Your Fund's Name]. Let our expertise guide your journey in the decentralized world. Join us, and be a part of the financial renaissance.
        </Section>


        </main>
    )
}
