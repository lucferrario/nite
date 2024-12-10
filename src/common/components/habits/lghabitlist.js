import React, { useState, useEffect, useContext } from "react";
import HabitInsert from "./habitinsert";
import SingleHabit from "./singlehabit";
import axios from "axios";
import HabitContext from "../../contexts/habit";
import Skeleton from "@mui/material/Skeleton";
import { motion } from "framer-motion";

function LgHabitList({
  habitsRemount,
  setHabitsRemount,
  challengesRemount,
  setChallengesRemount,
  children,
}) {
  const { editingRemount } = useContext(HabitContext);

  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rendered, setRendered] = useState(false);
  const [deletedHabitId, setDeletedHabitId] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState(null);

  const checkHabits = () => {
    axios
      .get("/api/habits")
      .then((response) => {
        setHabits(response.data.data.reverse());
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const checkChallenges = () => {
    axios.get("/api/challenges").then((response) => {
      setChallenges(response.data.data);
    });
  };

  useEffect(() => {
    setRendered(false);
    checkHabits();
    checkChallenges();
    setRendered(true);
  }, []);

  useEffect(() => {
    setRendered(false);
    checkHabits();
    checkChallenges();
    setRendered(true);
  }, [habitsRemount, editingRemount]);

  useEffect(() => {
    if (filter) {
      axios.get(`/api/challenges?id=${filter}`).then((res) => {
        setHabits(res.data.data.Habits);
      });
    } else {
      checkHabits();
    }
  }, [filter]);

  return (
    <>
      <div
        className={`p-3 rounded-3xl grid grid-rows-auto max-h-[70vh] overflow-y-auto grid-cols-1 gap-y-2 z-[5] relative bg-[color:var(--bg-panel)] opacity-0 transition-all duration-75 linear ${
          rendered ? "opacity-100" : ""
        }`}
      >
        <HabitInsert
          setRemount={setHabitsRemount}
          enabled={habits[31] ? false : true}
        />
        <>
          {isLoading && habits.length === 0 ? (
            <Skeleton
              variant="rounded"
              height={44}
              animation="wave"
              style={{
                borderRadius: 16,
                backgroundColor: "var(--bg-habit)",
                opacity: 0.7,
              }}
            />
          ) : (
            <>
              {habits.map((habit) => {
                return (
                  <motion.div
                    key={habit.id}
                    variants={{
                      hidden: { opacity: 0, x: 0, y: -40 },
                      enter: { opacity: 1, x: 0, y: 0 },
                      exit: { opacity: 0, x: 0, y: -40 },
                    }}
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    transition={{
                      duration: 0.1,
                      type: "linear",
                      stiffness: 0,
                      ease: "linear",
                    }}
                  >
                    <SingleHabit
                      key={habit.id}
                      id={habit.id}
                      text={habit.text}
                      note={habit.note}
                      checked={
                        habit.lastCheck ===
                        new Date().toISOString().split("T")[0]
                          ? true
                          : false
                      }
                      habitsRemount={habitsRemount}
                      setHabitsRemount={setHabitsRemount}
                      challengesRemount={challengesRemount}
                      setChallengesRemount={setChallengesRemount}
                      size="lg"
                    />
                  </motion.div>
                );
              })}
            </>
          )}
          {!habits[0] && !isLoading ? (
            <p className="p-3 px-5 rounded-2xl text-sm bg-[color:var(--error-bg)] text-opacity-50">
              Damn! You don&apos;t have any habit set, create new ones up here!
            </p>
          ) : (
            ""
          )}
        </>
      </div>
      <div className="flex gap-2 mt-3">
        {challenges && (
          <>
            <button
              className="w-12 h-12 rounded-2xl flex justify-center items-center gap-2 z-[5] relative bg-[color:var(--bg-panel)] transition-all duration-75 linear"
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
                  className="w-12 h-12 rounded-2xl flex justify-center items-center gap-2 z-[5] relative bg-[color:var(--bg-panel)] transition-all duration-75 linear"
                  onClick={() => {
                    setFilter(challenge.id);
                  }}
                >
                  <p className="font-semibold">
                    {challenge.icon ? challenge.icon : "🏋️‍♂️"}
                  </p>
                </button>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default LgHabitList;
