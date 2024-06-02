import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { scrollSepolia } from "viem/chains";
import { publicClient } from "../../contracts/config";
import { abi } from "../../contracts/abi";

export default function PendingEventsList() {
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

  return (
    <div className="">
      <h2 className="text-4xl font-extrabold mb-5 text-black">
        Pending Invites
      </h2>
      {/* MAP ALL INVITES */}
      <div className="rounded-xl border-solid border-4 border-gray-300 text-left px-3 py-5">
        <div className="flex">
          <h3 className="font-bold text-2xl">S2O Vancouver</h3>
          <span className="ml-auto">17/07/2024</span>
        </div>
        <div>Location: Vancouver</div>
        <div className="mt-5">
          <span
            className={`bg-black text-white px-4 py-1 rounded-full mr-2 min-w-[100px]`}
          >
            Vote
          </span>
        </div>
        <div className="mt-5 w-full flex">
          <button className="ml-auto">✅ Accept</button>
        </div>
      </div>
    </div>
  );
}
