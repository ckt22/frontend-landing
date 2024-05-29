import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  rabbyWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createClient, http } from "viem";

const defaultConfig = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet],
});

defaultConfig.getClient;

const connectorsConfig = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        rabbyWallet,
        metaMaskWallet,
      ],
    },
  ],
  {
    appName: "RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
  }
);

const config = createConfig({
  connectors: connectorsConfig,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <main className={`${poppins.variable} font-poppins`}>
            <Component {...pageProps} />
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
