import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Select from "react-select";
import PlaceAutocomplete from "../../components/LocationSelect";
import { publicClient } from "../../contracts/config";
import { mockTokenAbi } from "../../contracts/mockTokenAbi";
import { abi } from "../../contracts/abi";
import { createWalletClient, custom, parseEther } from "viem";
import { scrollSepolia } from "viem/chains";

interface ValueProps {
  name: string;
  deadline: string;
  date: string;
  verfication: string[];
  location: any;
  committment: string;
  penalty: string;
}

export default function CreatePage() {
  const { push } = useRouter();
  const [values, setValues] = useState<ValueProps>({
    name: "",
    deadline: "",
    date: "",
    verfication: [],
    location: {},
    committment: "0",
    penalty: "0",
  });
  const [walletClient, setWalletClient] = useState<any>();

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
        <div className="border-4 border-solid border-black rounded-xl flex flex-col p-4 w-full md:w-[850px] text-left">
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
          <Select
            isMulti
            name="members"
            classNames={{
              control: () => "border-none bg-transparent text-black",
            }}
            options={[
              {
                label: "ckt22",
                value: "0x533E173BDb9f76560d556B17ff275225f4170E53",
              },
              {
                label: "zfrankie",
                value: "1234",
              },
              {
                label: "0xkmg",
                value: "0xb0b25f21377e69fcf5d54ebd9ec9f9bca9938939",
              },
            ]}
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
          <label htmlFor="committment">Committment</label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="string"
            onChange={(e) =>
              setValues({ ...values, committment: e.target.value })
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
            onClick={async () => {
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
              const { request: approval } = await publicClient.simulateContract(
                {
                  address: "0xf8Bc58f8aef773aBBA1019E8aA048fc5AF876a38",
                  abi: mockTokenAbi,
                  functionName: "approve",
                  args: [
                    "0xadd81d4F68AB0420EdA840cFbc07Ff2d6fd708F1",
                    parseEther(values.committment),
                  ],
                  account: account[0],
                }
              );
              await walletClient.writeContract(approval);

              console.log(
                values.name,
                new Date(values.deadline).getTime(),
                new Date(values.date).getTime(),
                parseEther(values.committment),
                parseEther(values.penalty),
                encodedCoordinates,
                [
                  "0xadd81d4F68AB0420EdA840cFbc07Ff2d6fd708F1",
                  "0x533E173BDb9f76560d556B17ff275225f4170E53",
                ]
              );

              const { request } = await publicClient.simulateContract({
                address: "0xadd81d4f68ab0420eda840cfbc07ff2d6fd708f1",
                abi: abi,
                functionName: "createEvent",
                args: [
                  values.name,
                  new Date(values.deadline).getTime(),
                  new Date(values.date).getTime(),
                  parseEther(values.committment),
                  parseEther(values.penalty),
                  encodedCoordinates,
                  [
                    "0xadd81d4F68AB0420EdA840cFbc07Ff2d6fd708F1",
                    "0x533E173BDb9f76560d556B17ff275225f4170E53",
                  ],
                ],
                account: account[0],
              });
              await walletClient.writeContract(request);
            }}
          >
            Create
          </button>
        </div>
      </div>
    </Layout>
  );
}
