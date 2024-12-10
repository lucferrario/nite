import React, { useState, useEffect } from "react";
import SingleHabit from "../habits/singlehabit";
import axios from "axios";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

function SmHabitList({ children }) {
  // const childrenArray = React.Children.toArray(children);
  const [habits, setHabits] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [remount, setRemount] = useState("");
  // const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkHabits = () => {
    axios.get("/api/habits").then((response) => {
      setHabits(response.data.data);
      setLoading(false);
    });
  };

  const checkChallenges = () => {
    axios.get("/api/challenges").then((response) => {
      setChallenges(response.data.data);
    });
  };

  useEffect(() => {
    checkHabits();
    // checkChallenges();
  }, []);

  useEffect(() => {
    checkHabits();
    // checkChallenges();
  }, [remount]);

  // useEffect(() => {
  //   if (filter) {
  //     axios.get(`/api/challenges?id=${filter}`).then((res) => {
  //       setHabits(res.data.data.Habits);
  //     });
  //   } else {
  //     checkHabits();
  //   }
  // }, [filter]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {loading ? (
        <div className="box-border w-full p-3 flex flex-col rounded-3xl md:grid bg-[color:var(--bg-panel)]">
          <Skeleton
            variant="rounded"
            height={44}
            animation="wave"
            style={{
              borderRadius: 16,
              backgroundColor: "var(--bg-habit)",
              opacity: 0.7,
            }}
            className="w-full h-full"
          />
        </div>
      ) : (
        <>
          {habits[0] ? (
            <div
              id="habitlist"
              className="box-border w-full max-h-60 overflow-y-auto p-3 flex flex-col grid-rows-auto grid-cols-2 gap-x-3 gap-y-2 rounded-3xl md:grid bg-[color:var(--bg-panel)] justify-center items-center"
            >
              {habits.map((habit) => {
                return (
                  <SingleHabit
                    key={habit.id}
                    id={habit.id}
                    text={habit.text}
                    note={habit.note}
                    checked={
                      habit.lastCheck === new Date().toISOString().split("T")[0]
                        ? true
                        : false
                    }
                    setHabitsRemount={setRemount}
                    setChallengesRemount={setRemount}
                    size="sm"
                  />
                );
              })}
            </div>
          ) : (
            <div className="box-border w-full p-3 flex flex-col rounded-3xl md:grid bg-[color:var(--bg-panel)]">
              <p className="p-3 px-5 rounded-2xl text-sm bg-[color:var(--error-bg)]">
                Damn! You don&apos;t have any habit set, run to the{" "}
                <Link href="/habits" className="text-blue-800">
                  habits page
                </Link>{" "}
                to create new ones!
              </p>
            </div>
          )}
          {/* <div
        className={`flex md:flex-col gap-2 mt-3 md:mt-0 md:ml-3 min-w-fit max-h-[${listHeight}px] overflow-x-hidden overflow-y-scroll`}
      >
        {challenges && (
          <>
            <button
              className="!w-12 !h-12 p-3 rounded-2xl flex justify-center items-center gap-2 z-[5] relative bg-[color:var(--bg-panel)] transition-all duration-75 linear"
              onClick={() => {
                setFilter(null);
              }}
            >
              <p className="font-semibold">🌐</p>
            </button>
            {challenges.map((challenge) => {
              return (
                <button
                  key={challenge.id}
                  className="!w-12 !h-12 p-3 rounded-2xl flex justify-center items-center gap-2 z-[5] relative bg-[color:var(--bg-panel)] transition-all duration-75 linear"
                  onClick={() => {
                    setFilter(challenge.id);
                  }}
                >
                  <p className="font-semibold">{challenge.icon}</p>
                </button>
              );
            })}
          </>
        )}
      </div> */}
        </>
      )}
    </div>
  );
}

export default SmHabitList;
