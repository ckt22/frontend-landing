import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextHead from "next/head";
import { ReactNode } from "react";
import { useAccount } from "wagmi";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isConnected } = useAccount();

  return (
    <div>
      {/* HEADER */}
      <div className="px-3 py-4 flex items-center">
        <span>Be Right There</span>
        {isConnected ? (
          <div className="ml-auto">
            <ConnectButton />
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-center flex-col text-center min-h-[86vh]">
        {isConnected ? (
          <div>{children}</div>
        ) : (
          <div>
            <p>Start your journey by connecting your wallet</p>
            <ConnectButton />
          </div>
        )}
      </div>

      <footer className="flex px-5 items-center justify-center">
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Kayaga Web3 🌈
        </a>
      </footer>
    </div>
  );
}
