import { useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Select from "react-select";
import PlaceAutocomplete from "../../components/LocationSelect";

interface ValueProps {
  name: string;
  date: string;
  verfication: string[];
  location: any;
  deposit: string;
}

export default function CreatePage() {
  const { push } = useRouter();
  const [values, setValues] = useState<ValueProps>({
    name: "",
    date: "",
    verfication: [],
    location: {},
    deposit: "0",
  });

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
          <label htmlFor="date">Date and Time</label>
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
                value: "346",
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
          <label htmlFor="deposit">Deposit</label>
          <input
            className="border-2 border-solid border-black rounded-md my-3 p-2"
            type="string"
            onChange={(e) => setValues({ ...values, deposit: e.target.value })}
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
            onClick={() => console.log("ok")}
          >
            Create
          </button>
        </div>
      </div>
    </Layout>
  );
}
