import React, { useState, useEffect, useContext } from "react";
import ChallengeHabit from "./challenges/challengehabit";
import axios from "axios";
import AlertContext from "../../contexts/alertcontext";
import { useSession } from "next-auth/react";
import Skeleton from "@mui/material/Skeleton";

function JoinAChallenge({
  habitsRemount,
  setHabitsRemount,
  challengesRemount,
  setChallengesRemount,
}) {
  const [challenge, setChallenge] = useState(null);
  const [habits, setHabits] = useState([]);
  const [id, setId] = useState("cm3izezjf000h9t2sozsg2yz7");
  const { setAlert, setAlertType } = useContext(AlertContext);
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  //set user id
  useEffect(() => {
    if (challenge) {
      setHabits(challenge.Habits);
    }
    if (session) {
      axios.get("/api/user").then((res) => {
        setUserId(res.data.user.id);
      });
    }
  }, []);

  //get challenge defined in id
  useEffect(() => {
    axios
      .get(`/api/challenges?id=${id}`)
      .then((res) => {
        setChallenge(res.data.data);
        setHabits(res.data.data.Habits);
        setLoading(false);
      })
      .catch((err) => {
        setAlert(err.message);
        setAlertType("error");
        setLoading(false);
      });
  }, [id]);

  //get all user challenges to see if user already joined
  useEffect(() => {
    if (userId) {
      axios.get("/api/challenges").then((res) => {
        res.data.data.forEach((ch) => {
          if (challenge) {
            if (
              ch.name === challenge.name &&
              ch.description === challenge.description
            ) {
              setJoined(true);
            }
          }
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengesRemount, challenge, id]);

  const joinChallenge = async () => {
    if (joined === false) {
      axios
        .put("/api/challenges", { id: id, action: "join" })
        .then((res) => {
          setAlertType("standard");
          setAlert(res.data.message);
          setChallengesRemount(Math.random());
          setHabitsRemount(Math.random());
        })
        .catch((err) => {
          setAlert(err.message);
          setAlertType("error");
        });
    } else {
      setAlert("You already joined this challenge!");
      setAlertType("error");
    }
  };

  return (
    <div className="p-3 bg-[color:var(--bg-panel)] rounded-3xl flex flex-col">
      {loading ? (
        <Skeleton
          variant="rounded"
          height={100}
          animation="wave"
          style={{
            borderRadius: 15,
            backgroundColor: "var(--bg-habit)",
            opacity: 0.7,
            gridColumnEnd: "span 2",
          }}
        />
      ) : (
        <>
          {challenge ? (
            <>
              {challenge.creator.id !== userId && !challenge.open ? (
                <div className="p-10">
                  <h1 className="font-semibold text-2xl text-center mb-2">
                    Oh no!
                  </h1>
                  <p className="font-medium text-center">
                    Looks like this challenge was set to private by the creator.
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-full h-full flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="rounded-2xl p-[10px] bg-[color:var(--bg-secondary)] mr-3 h-11 w-11">
                        <p className="text-center w-full">
                          {challenge.icon ? challenge.icon : "🏋️"}
                        </p>
                      </div>
                      <div>
                        <h1 className="font-semibold text-lg">
                          {challenge.name}
                        </h1>
                        {/* <p className="text-[color:var(--quaternary-color)] text-sm">
                    Created by {challenge.creator.name}
                  </p> */}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[color:var(--bg-secondary)] py-2 px-3">
                      <p className="text-sm font-medium">
                        {challenge.duration}{" "}
                        {challenge.duration !== 1 ? " days" : " day"}
                      </p>
                    </div>
                  </div>
                  <div className="gap-2 flex flex-col mt-5">
                    {habits.length > 0 ? (
                      habits.map((habit) => {
                        return (
                          <ChallengeHabit
                            key={habit.id}
                            text={habit.text}
                            id={habit.id}
                            checked={habit.lastcheck < new Date()}
                            location="view"
                            habits={habits}
                            setHabits={setHabits}
                          />
                        );
                      })
                    ) : (
                      <p className="p-3 px-5 rounded-2xl text-sm bg-[color:var(--error-bg)] text-opacity-50">
                        Damn! This challenge does not have any habit set!
                      </p>
                    )}
                  </div>
                  {/* do not show if user is creator */}
                  <button
                    className="bg-[color:var(--bg-tertiary)] w-full py-3 px-5 rounded-2xl mt-3 withbefore"
                    onClick={joinChallenge}
                    disabled={joined}
                  >
                    <p className="font-semibold text-sm">
                      {joined
                        ? "You already joined this challenge!"
                        : "Join challenge"}
                    </p>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-[color:var(--bg-secondary)] p-3">
              <h1 className="font-semibold text-xl text-center mb-2">
                Oh no! :(
              </h1>
              <p className="font-medium text-center text-[color:var(--tertiary-color)] text-sm">
                Looks like this challenge does not exist.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JoinAChallenge;
