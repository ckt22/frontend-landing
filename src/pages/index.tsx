import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import PendingEventsList from "../components/PendingEventsList";
import UpcomingEventsList from "../components/UpcomingEventsList";
import Pnl from "../components/Pnl";

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
              className="bg-gray-100 px-3 py-2 rounded-full mr-2 md:min-w-[100px]"
              onClick={() => setCurrentTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
          {/* CONTENT */}
          <div className="mt-5 w-full max-sm:px-3 md:w-[700px] text-left">
            {/* UPCOMING */}
            {currentTab === "upcoming" && <UpcomingEventsList />}
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
                  <div>Everyone was on time!</div>
                </div>
              </div>
            )}
            {currentTab === "invites" && <PendingEventsList />}
            {currentTab === "pnl" && <Pnl />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
