import { useEffect, useState } from "react";
import { abi } from "../../contracts/abi";
import { publicClient } from "../../contracts/config";
import { createWalletClient, custom } from "viem";
import { scrollSepolia } from "viem/chains";

export default function Pnl() {
  const [totalPenalties, setTotalPenalties] = useState<any>([]);
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
        functionName: "getUserPenalties",
        args: [account[0]],
      });

      console.log(data);

      setTotalPenalties(Number(data));
    }
    getEvents();
  }, [walletClient]);

  return (
    <div className="">
      <h2 className="text-4xl font-extrabold mb-5 text-black">P&L</h2>
      {/* MAP ALL INVITES */}
      <div className="rounded-xl border-solid border-4 border-gray-300 text-left px-3 py-5">
        <p>
          Total Penalties:
          <span className="font-bold ml-1">{totalPenalties}</span>
        </p>
      </div>
    </div>
  );
}
