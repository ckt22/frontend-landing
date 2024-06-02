import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { scrollSepolia } from "viem/chains";
import { publicClient } from "../../contracts/config";
import { abi } from "../../contracts/abi";

export default function UpcomingEventsList() {
  const [events, setEvents] = useState<any>([]);
  const [walletClient, setWalletClient] = useState<any>();

  useEffect(() => {
    // set wallet client
    if (typeof window !== undefined) {
      const walletClient = createWalletClient({
        chain: scrollSepolia,
        transport: custom(window.ethereum!),
      });

      setWalletClient(walletClient);
    }
  }, [setWalletClient]);

  useEffect(() => {
    async function getEvents() {
      if (!walletClient) {
        return;
      }

      // get events from contract
      const account = await walletClient.getAddresses();

      // get events from contract
      const data = await publicClient.readContract({
        address: "0xfcc5aff8946Aa3A8015959Bc468255489FcaD241",
        abi: abi,
        functionName: "getInvitedEvents",
        args: [account[0]],
      });

      console.log(data);
    }
    getEvents();
  }, [walletClient]);

  return <div></div>;
}
