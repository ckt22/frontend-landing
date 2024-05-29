import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const { push } = useRouter();

  const tabs = [
    {
      label: "Upcoming",
      value: "upcoming",
    },
    {
      label: "Past",
      value: "past",
    },
    {
      label: "Invites",
      value: "invites",
    },
    {
      label: "P&L",
      value: "pnl",
    },
  ];

  return (
    <Layout>
      <div>
        {/* TABS */}
        <div className="w-2xl">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              className="bg-gray-100 px-3 py-2 rounded-full mr-2 min-w-[100px]"
              onClick={() => setCurrentTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
          {/* CONTENT */}
          <div className="mt-5 w-[700px] text-left">
            {/* UPCOMING */}
            {currentTab === "upcoming" && (
              <div>
                <h2 className="text-4xl font-extrabold mb-5">Upcoming Bets</h2>
                <div
                  role="button"
                  onClick={() => push("/create")}
                  className="rounded-xl border-4 border-black border-dashed text-left px-3 my-3 py-5"
                >
                  <h3>+ Create new event</h3>
                </div>
                {/* MAP ALL UPCOMING HAPPENINGS */}
                <div className="rounded-xl border-solid border-4 border-black text-left px-3 py-5">
                  <div className="flex">
                    <h3 className="font-bold text-2xl">Hackathon Submission</h3>
                    <span className="ml-auto">01/06/2024 (in 5 days)</span>
                  </div>
                  <div>3 members</div>
                </div>
              </div>
            )}
            {currentTab === "past" && (
              <div className="text-gray-300">
                <h2 className="text-4xl font-extrabold mb-5 text-black">
                  Past Bets
                </h2>
                {/* MAP ALL PAST HAPPENINGS */}
                <div className="rounded-xl border-solid border-4 border-gray-300 text-left px-3 py-5">
                  <div className="flex">
                    <h3 className="font-bold text-2xl">Poker Night</h3>
                    <span className="ml-auto">15/05/2024</span>
                  </div>
                  <div>10 members</div>
                </div>
              </div>
            )}
            {currentTab === "invites" && (
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
                  <div>15 members</div>
                </div>
              </div>
            )}
            {currentTab === "pnl" && (
              <div className="">
                <h2 className="text-4xl font-extrabold mb-5 text-black">P&L</h2>
                {/* MAP ALL INVITES */}
                <div className="rounded-xl border-solid border-4 border-gray-300 text-left px-3 py-5">
                  <p>
                    <span className="font-bold">Kit</span> has been late for
                    total 69 minutes
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
