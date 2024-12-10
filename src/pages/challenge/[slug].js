import React, { useState, useEffect, useContext } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Habits from "../habits";
import { createPortal } from "react-dom";
import ChallengeHabit from "../../common/components/habits/challenges/challengehabit";
import AlertContext from "../../common/contexts/alertcontext";
import axios from "axios";
import Modal from "../../common/components/modal";

export default function Challenge({ challenge }) {
  const router = useRouter();
  const { slug } = router.query;

  const { data: session, status } = useSession();
  const { setAlert, setAlertType } = useContext(AlertContext);
  const [modalOpen, setModalOpen] = useState(true);
  const [habits, setHabits] = useState([]);
  const [userId, setUserId] = useState(null);

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

  useEffect(() => {
    console.log(modalOpen);
  }, []);

  const joinChallenge = async () => {
    axios
      .put("/api/challenges", { id: slug, action: "join" })
      .then((res) => {
        setAlert(res.data.message);
        setAlertType("standard");
        onClose();
      })
      .catch((err) => {
        setAlert(err.message);
        setAlertType("error");
      });
  };

  const onClose = () => {
    setModalOpen(false);
    router.push("/habits", undefined, { shallow: true });
  };

  if (!challenge || !modalOpen) return null;
  return (
    <>
      <Habits />
      <Modal open={modalOpen} onClose={onClose} allowClose={false}>
        <div className="p-3 bg-[color:var(--bg-panel)] rounded-3xl flex flex-col z-50 w-[90vw] md:w-[50vw] xl:w-[30vw]">
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
                    <h1 className="font-semibold text-lg">{challenge.name}</h1>
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
              >
                <p className="font-semibold text-sm">Join challenge</p>
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { slug } = context.params;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/challenges?id=${slug}`,
      {
        headers: {
          cookie: context.req.headers.cookie,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status code ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        challenge: data.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
