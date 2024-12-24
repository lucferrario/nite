import React, { useState, useEffect, useContext } from "react";
import Header from "../header";
import LgHabitList from "./lghabitlist";
import Editpanel from "./editpanel";
import Challenges from "./challenges";
import JoinAChallenge from "./joinachallenge";

import HabitContext from "../../contexts/habit";

function Habits({ active, setActive }) {
  const { editing } = useContext(HabitContext);
  //separate the remount components to avoid rerendering the whole page
  const [habitsRemount, setHabitsRemount] = useState(0);
  const [challengesRemount, setChallengesRemount] = useState(0);
  const [remount, setRemount] = useState(0);

  return (
    <div className="w-full h-full min-h-full box-border overflow-y-scroll rounded-3xl pt-8 p-5 relative 2xl:p-8 pb-32 xl:pb-8">
      <Header active={active} setActive={setActive} />
      <div className="flex flex-col h-full lg:flex-row">
        <div className="lg:w-1/2 lg:mr-8">
          <div className="">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Current habits
            </p>
            <LgHabitList
              habitsRemount={habitsRemount}
              setHabitsRemount={setHabitsRemount}
              challengesRemount={challengesRemount}
              setChallengesRemount={setChallengesRemount}
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className={`${editing && "mb-10 mt-10"}`}>
            {editing ? <Editpanel /> : null}
          </div>
          <div className="mb-10">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Active Challenges
            </p>
            <Challenges
              habitsRemount={habitsRemount}
              setHabitsRemount={setHabitsRemount}
              challengesRemount={challengesRemount}
              setChallengesRemount={setChallengesRemount}
            />
          </div>
          <div className="mb-10">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Join a challenge
            </p>
            <JoinAChallenge
              habitsRemount={habitsRemount}
              setHabitsRemount={setHabitsRemount}
              challengesRemount={challengesRemount}
              setChallengesRemount={setChallengesRemount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Habits;
