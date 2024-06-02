import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { scrollSepolia } from "viem/chains";
import axios from "axios";
import { publicClient } from "../../contracts/config";
import { abi } from "../../contracts/abi";
import { differenceInMinutes, format } from "date-fns";
import { useRouter } from "next/router";

export default function UpcomingEventsList() {
  const { push } = useRouter();
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
        args: [account[0], false, true],
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
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            Number(decodedCoordinates[0] as bigint) / 1000000
          },${Number(decodedCoordinates[1] as bigint) / 1000000}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        evt.address = data.results[0].formatted_address;
      }

      setEvents((data as any).sort((a: any, b: any) => Number(a.arrivalTime) - Number(b.arrivalTime)));
    }
    getEvents();
  }, [walletClient]);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">Upcoming Bets</h2>
      <div
        role="button"
        onClick={() => push("/create")}
        className="rounded-xl border-4 border-black border-dashed text-left px-3 my-3 py-5">
        <h3>+ Create new event</h3>
      </div>
      {/* MAP ALL UPCOMING HAPPENINGS */}
      {events.map((event: any, index: number) => (
        <div
          key={`upcoming_${index}`}
          className="rounded-xl border-solid border-4 border-black text-left px-3 py-5 mb-3">
          <div className="flex">
            <h3 className="font-bold text-2xl">{event.name}</h3>
            <span className="ml-auto">{format(new Date(Number(event.arrivalTime)), "yyyy-MM-dd (HH:mm)")}</span>
          </div>
          <div>Location: {event.address}</div>
          <div className="mt-5 w-full flex">
            <button
              disabled={Math.abs(differenceInMinutes(new Date(Number(event.arrivalTime)), new Date())) > 10}
              onClick={async () => {
                const account = await walletClient.getAddresses();

                const { request } = await publicClient.simulateContract({
                  address: "0xfcc5aff8946Aa3A8015959Bc468255489FcaD241",
                  abi: abi,
                  functionName: "mockValidationTrue",
                  args: [event.eventId, account[0]],
                  account: account[0],
                });
                await walletClient.writeContract(request);
              }}
              className={`ml-auto bg-black disabled:bg-gray-300 text-white px-4 py-1 rounded-full mr-2 min-w-[100px]`}>
              Verify Location
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
