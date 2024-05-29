import { useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

interface ValueProps {
  name: string;
  date: string;
  verfication: string[];
}

export default function CreatePage() {
  const { push } = useRouter();
  const [values, setValues] = useState<ValueProps>({
    name: "",
    date: "",
    verfication: [],
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
          className="py-2 border-b-2 border-solid border-black px-0"
          onClick={() => push("/")}
        >
          Back
        </button>
      </div>

      <div className="text-left">
        <h1 className="text-4xl font-extrabold my-3">Create</h1>
        <div className="border-4 border-solid border-black flex flex-col p-4 w-[850px] text-left">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="date">Verfication</label>
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
          </div>

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
