import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PlaceAutocomplete from "../../components/LocationSelect";
import { publicClient } from "../../contracts/config";
import { mockTokenAbi } from "../../contracts/mockTokenAbi";
import { abi } from "../../contracts/abi";
import CreatableSelect from "react-select/creatable";
import { createWalletClient, custom, parseEther } from "viem";
import { scrollSepolia } from "viem/chains";

interface ValueProps {
  name: string;
  deadline: string;
  date: string;
  verfication: string[];
  members: string[];
  location: any;
  commitment: string;
  penalty: string;
}

export default function CreatePage() {
  const { push } = useRouter();
  const [values, setValues] = useState<ValueProps>({
    name: "",
    deadline: "",
    date: "",
    members: [],
    verfication: [],
    location: {},
    commitment: "0",
    penalty: "0",
  });
  const [walletClient, setWalletClient] = useState<any>();
  const [eventCreated, setEventCreated] = useState<boolean>(false);

  const verficationMethods = [
    {
      label: "Vote",
      value: "vote",
    },
    {
      label: "Maps API",
      value: "maps",
    },
    {
      label: "NFC",
      value: "nfc",
    },
  ];

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

  return (
    <Layout>
      <div className="flex">
        <button
          className="py-1 border-b-2 border-solid border-black px-0 flex"
          onClick={() => push("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <span className="mx-1">Back to Upcoming</span>
        </button>
      </div>

      <div className="text-left">
        <h1 className="text-4xl font-extrabold my-3">Create</h1>
        <div className="border-4 border-solid border-black rounded-xl flex flex-col p-4 w-[92vw] md:w-[800px] text-left">
          <label htmlFor="name">Event Name</label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="text"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <label htmlFor="deadline">Registration Deadline</label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="datetime-local"
            onChange={(e) => setValues({ ...values, deadline: e.target.value })}
          />
          <label htmlFor="date">Event Start Date and Time</label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="datetime-local"
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
          <label htmlFor="members">Members</label>
          <CreatableSelect
            isMulti
            name="members"
            classNames={{
              control: () => "border-none bg-transparent text-black",
            }}
            options={[
              {
                label: "Winson",
                value: "0xadd81d4F68AB0420EdA840cFbc07Ff2d6fd708F1",
              },
              {
                label: "Kit",
                value: "0x764580ab307e0c6ee032b467d212dae7690b1424",
              },
              {
                label: "Frankie",
                value: "0x8fa77bbece6f2654d65c268b7dd636998ccb9576",
              },
              {
                label: "Roger",
                value: "0x33e3f1a34bf0bac3620f2bd4334b23fde1423831",
              },
            ]}
            onChange={(e) =>
              setValues({ ...values, members: e.map((e) => e.value) })
            }
            className="border-2 border-solid border-black rounded-md my-3"
          />
          <label htmlFor="location">Location</label>
          <PlaceAutocomplete
            onPlaceSelect={(place) =>
              setValues({
                ...values,
                location: {
                  lat: place?.geometry?.location?.lat(),
                  lng: place?.geometry?.location?.lng(),
                },
              })
            }
          />
          <label htmlFor="committment">
            Commitment (Amount to be paid by each party)
          </label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="string"
            onChange={(e) =>
              setValues({ ...values, commitment: e.target.value })
            }
          />
          <label htmlFor="penalty">Penalty</label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="string"
            onChange={(e) => setValues({ ...values, penalty: e.target.value })}
          />

          {/* <label htmlFor="date">Verfication</label>
          <div className="flex mb-3">
            {verficationMethods.map((tab, index) => (
              <button
                key={tab.value}
                className={` ${
                  values.verfication.includes(tab.value)
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                } px-3 py-2 rounded-full mr-2 min-w-[100px]`}
                onClick={() => {
                  if (values.verfication.includes(tab.value)) {
                    setValues({
                      ...values,
                      verfication: values.verfication.filter(
                        (item) => item !== tab.value
                      ),
                    });
                  } else {
                    setValues({
                      ...values,
                      verfication: [...values.verfication, tab.value],
                    });
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div> */}

          <button
            className="bg-black text-white border-2 border-solid border-black rounded-full py-2"
            disabled={eventCreated}
            onClick={async () => {
              try {
                const account = await walletClient.getAddresses();
                // encode coordinate
                const encodedCoordinates = await publicClient.readContract({
                  address: "0xfcc5aff8946Aa3A8015959Bc468255489FcaD241",
                  abi: abi,
                  functionName: "encodeCoordinates",
                  args: [
                    (values.location.lat * 1000000).toFixed(),
                    (values.location.lng * 1000000).toFixed(),
                  ],
                });

                // approve spending
                const { request: approval } =
                  await publicClient.simulateContract({
                    address: "0xf8Bc58f8aef773aBBA1019E8aA048fc5AF876a38",
                    abi: mockTokenAbi,
                    functionName: "approve",
                    args: [
                      "0xadd81d4F68AB0420EdA840cFbc07Ff2d6fd708F1",
                      parseEther(values.commitment),
                    ],
                    account: account[0],
                  });
                await walletClient.writeContract(approval);

                const { request } = await publicClient.simulateContract({
                  address: "0xfcc5aff8946Aa3A8015959Bc468255489FcaD241",
                  abi: abi,
                  functionName: "createEvent",
                  args: [
                    values.name,
                    new Date(values.deadline).getTime(),
                    new Date(values.date).getTime(),
                    parseEther(values.commitment),
                    parseEther(values.penalty),
                    encodedCoordinates,
                    values.members,
                  ],
                  account: account[0],
                });
                await walletClient.writeContract(request);

                toast.success("Event created.", { autoClose: 3000 });

                setEventCreated(true);
              } catch (e) {
                toast.error("Something went wrong. Please try again.", {
                  autoClose: 3000,
                });
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </Layout>
  );
}
