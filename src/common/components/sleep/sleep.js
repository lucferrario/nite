import React from "react";
import Header from "../header";
import SleepQuality from "./sleepquality";
import Cycles from "./cycles";
import NapList from "./naps/naplist";

function Sleep({ active, setActive }) {
  return (
    <div className="w-full h-full min-h-full box-border overflow-y-scroll rounded-3xl pt-8 p-5 relative 2xl:p-8 pb-32 xl:pb-8">
      <Header active={active} setActive={setActive} />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:mr-8">
          <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
            Sleep cycles
          </p>
          <Cycles />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mb-8">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              About tonight
            </p>
            <SleepQuality />
          </div>
          <div className="mb-8">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Naps - Last 7 days
            </p>
            <NapList />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Sleep;
