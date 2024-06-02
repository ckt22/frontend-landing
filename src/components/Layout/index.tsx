import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextHead from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isConnected } = useAccount();

  return (
    <div>
      <NextHead>
        <title>Be Right There</title>
        <meta
          content="Be Right There - a DeFi app for making everyone on time."
          name="description"
        />
      </NextHead>
      {/* HEADER */}
      <div className="px-3 py-4 flex items-center">
        <Image src="/brt-logo.jpeg" height={35} width={120} alt="logo" />
        {isConnected ? (
          <div className="ml-auto">
            <ConnectButton
              accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
              chainStatus={{ smallScreen: "none", largeScreen: "full" }}
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-start flex-col text-center min-h-[86vh]">
        {isConnected ? (
          <div>{children}</div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="my-5">Start your journey by connecting your wallet</p>
            <ConnectButton />
          </div>
        )}
      </div>

      <footer className="flex px-5 items-center justify-center">
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Kayaga Web3 🌈
        </a>
      </footer>

      <ToastContainer
        position="top-right"
        transition={Slide}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
