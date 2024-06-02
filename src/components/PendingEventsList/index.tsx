import { useEffect, useState } from "react";
import { createWalletClient, custom, parseEther, parseGwei } from "viem";
import { scrollSepolia } from "viem/chains";
import { publicClient } from "../../contracts/config";
import { abi } from "../../contracts/abi";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { mockTokenAbi } from "../../contracts/mockTokenAbi";

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
        functionName: "getUserEvents",
        args: [account[0], false, false],
      });

      // get location
      for (let evt of data as any) {
        const { location } = evt;

        const decodedCoordinates: any = await publicClient.readContract({
          address: "0xfcc5aff8946Aa3A8015959Bc468255489FcaD241",
          abi: abi,
          functionName: "decodeCoordinates",
          args: [location],
        });

        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Number(decodedCoordinates[0]) / 1000000},${
            Number(decodedCoordinates[1]) / 1000000
          }&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        evt.address = data.results[0].formatted_address;
      }

      console.log(data);

      setEvents((data as any).sort((a: any, b: any) => Number(a.arrivalTime) - Number(b.arrivalTime)));
    }
    getEvents();
  }, [walletClient]);

  return (
    <div className="">
      <h2 className="text-4xl font-extrabold mb-5 text-black">Pending Invites</h2>
      {/* MAP ALL INVITES */}
      {events.map((event: any, index: number) => (
        <div
          key={`pending_${index}`}
          className="rounded-xl border-solid border-4 border-black text-left px-3 py-5 mb-3">
          <div className="flex items-center">
            <h3 className="font-bold text-2xl">{event.name}</h3>
            <span className="ml-auto">{format(new Date(Number(event.arrivalTime)), "yyyy-MM-dd (HH:mm)")}</span>
          </div>
          <div>Location: {event.address}</div>
          <div>Commitment: ${(Number(event.commitmentRequired) / 10 ** 18).toString()}</div>
          <div>Penalty: ${(Number(event.penaltyRequired) / 10 ** 18).toString()}</div>
          {/* <div className="mt-5">
            <span
              className={`bg-black text-white px-4 py-1 rounded-full mr-2 min-w-[100px]`}
            >
              Vote
            </span>
          </div> */}
          <div className="mt-5 w-full flex">
            <button
              onClick={async () => {
                try {
                  // accept event
                  const account = await walletClient.getAddresses();
                  console.log("ok");
                  // approve spending
                  //                   const { request: approval } = await publicClient.simulateContract({
                  //                     address: "0xf8Bc58f8aef773aBBA1019E8aA048fc5AF876a38",
                  //                     abi: mockTokenAbi,
                  //                     functionName: "approve",
                  //                     args: [
                  //                       "0xadd81d4F68AB0420EdA840cFbc07Ff2d6fd708F1",
                  //                       parseEther(event.commitmentRequired.toString()),
                  //                     ],
                  //                     account: account[0],
                  //                   });
                  //                   await walletClient.writeContract(approval);
                  //
                  //                   console.log("ready to accept", event.eventId);

                  // accept event
                  const { request: accept } = await publicClient.simulateContract({
                    address: "0xfcc5aff8946Aa3A8015959Bc468255489FcaD241",
                    abi: abi,
                    functionName: "acceptInvite",
                    args: [event.eventId],
                    account: account[0],
                  });

                  await walletClient.writeContract(accept);

                  toast.success("Successfully accepted invite", {
                    autoClose: 1000,
                  });
                } catch (e) {
                  toast.error("Something went wrong. Please try again", {
                    autoClose: 1000,
                  });
                }
              }}
              className="ml-auto bg-black text-white px-3 py-1 rounded-lg">
              ✅ Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
