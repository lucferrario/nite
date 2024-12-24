import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "../header";
import { habits } from "../../../data/habits";

import News from "./news";
import NewsModal from "./newsmodal";
import Spinner from "../spinner";
import SmHabitList from "./smhabitlist";
import SingleHabit from "../habits/singlehabit";
import LastNight from "./lastnight";
import NapInsert from "../sleep/naps/napinsert";

function Home({ active, setActive }) {
  const Quote = React.lazy(() => import("./quote"));
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <div className="relative w-full h-full min-h-full box-border overflow-y-scroll rounded-3xl pt-8 p-5 2xl:p-8 pb-32 xl:pb-8">
      <Header active={active} setActive={setActive} />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:mr-8">
          <div className="mb-10">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Today at nite
            </p>
            <News newsOpen={newsOpen} setNewsOpen={setNewsOpen} />
            {newsOpen && (
              <NewsModal
                newsOpen={newsOpen}
                setNewsOpen={setNewsOpen}
              ></NewsModal>
            )}
          </div>
          <div className="">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              About last night
            </p>
            <LastNight />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="mb-10">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Add a nap
            </p>
            <div className="w-full flex">
              <NapInsert />
            </div>
          </div>
          <div className="mb-10">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Current habits
            </p>
            <div className="flex w-full">
              <SmHabitList>
                {habits.map((habit) => {
                  return (
                    <SingleHabit
                      key={habit.id}
                      id={habit.id}
                      text={habit.text}
                      icon={habit.icon}
                      checked={habit.checked}
                    />
                  );
                })}
              </SmHabitList>
            </div>
          </div>
          <div className="">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Today at a glance
            </p>
            <Suspense fallback={<Spinner />}>
              <Quote />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
