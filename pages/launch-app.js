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

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(231,233,237)'
};

import Chart from 'chart.js/auto'
var color = Chart.helpers.color;

const radar_options = {};


const radar_data = {
    labels: [
      ["Eating", "Dinner"],
      ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"
    ],
    datasets: [{
      label: "My First dataset",
      backgroundColor: color(chartColors.red).alpha(0.2).rgbString(),
      borderColor: chartColors.red,
      pointBackgroundColor: chartColors.red,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }, {
      label: "My Second dataset",
      borderColor: chartColors.blue,
      pointBackgroundColor: chartColors.blue,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }, ],
    options: {
        legend: {
            position: 'top',
            labels: { fontColor: 'white' }
        },
        title: {
            display: true,
            text: 'Chart.js Radar Chart',
            fontColor: 'white'
        },
        scale: {
            ticks: {
                beginAtZero: true,
                fontColor: 'white', // labels such as 10, 20, etc
                showLabelBackdrop: false // hide square behind text
            },
            pointLabels: { fontColor: 'white' /* labels around the edge like 'Running' */ },
            gridLines: { color: 'rgba(255, 255, 255, 0.2)' },
            angleLines: { color: 'white' /* lines radiating from the center */ }
        }
    }
};

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

    const { data: poolAddressPre, isSuccess } = useContractRead({
        ...contractConfig,
        functionName: 'getPool',
        args: ['0x65faac6acbd781e7b3e799fa7f6e90b0263fa51e000200000000000000000866'],
        watch: true,
    });

    const poolAddress = isConnected ? (isSuccess ? poolAddressPre[0] : "loading...") : "connect wallet to view";

    const { data: lpBalancePre } = useContractRead({
        ...{
            address: poolAddress,
            abi: lpcabi,
        },
        functionName: 'balanceOf',
        args: [address],
        watch: true,
    });

    const { data: lpDecimals } = useContractRead({
        ...{
            address: poolAddress,
            abi: lpcabi,
        },
        functionName: 'decimals',
        watch: true,
    });

    const lpBalance = Number(lpBalancePre) / (10**Number(lpDecimals))

    const CC = dynamic(() => import("../components/copy-clipboard").then(mod => mod.CopyClipboard), { ssr: false })

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <Header  />

        <Section>
        <h1>
        Entanglement Fund (QEF)
        </h1>

        <div className="grid w-full grid-cols-1 pt-12 justify-items-end">
        <div> <ConnectButton /> </div>
        </div>

        <div className="flex flex-col items-center">
            Pool Address: {poolAddress} <CC  content={poolAddress} />
            你的lp余额: {Number(lpBalance)}
        </div>


        </Section>

        <Section>
        Radar chart
        <Radar data={radar_data} options={radar_options} />
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
