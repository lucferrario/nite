import React, { useState, useEffect } from "react";
import Challenge from "./challenges/challenge";
import axios from "axios";
import ChallengeInsert from "./challenges/challengeInsert";
import ChallengeEdit from "./challenges/challengeEdit";
import Skeleton from "@mui/material/Skeleton";
import Modal from "../modal";

function Challenges({
  habitsRemount,
  setHabitsRemount,
  challengesRemount,
  setChallengesRemount,
}) {
  const [insertOpen, setInsertOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchChallenges = () => {
    axios
      .get("/api/challenges")
      .then((res) => {
        setChallenges(res.data.data);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [challengesRemount]);

  return (
    <div className="relative p-3 rounded-3xl bg-[color:var(--bg-panel)]">
      <Modal
        open={insertOpen}
        onClose={() => setInsertOpen(false)}
        allowClose={true}
      >
        <ChallengeInsert
          isOpen={insertOpen}
          setIsOpen={setInsertOpen}
          challengesRemount={challengesRemount}
          setChallengesRemount={setChallengesRemount}
          habitsRemount={habitsRemount}
          setHabitsRemount={setHabitsRemount}
        />
      </Modal>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        allowClose={true}
      >
        <ChallengeEdit
          isOpen={editOpen}
          setIsOpen={setEditOpen}
          habitsRemount={habitsRemount}
          setHabitsRemount={setHabitsRemount}
          setChallengesRemount={setChallengesRemount}
          challengesRemount={challengesRemount}
          idChallenge={editingId}
        />
      </Modal>
      <div className="flex flex-col xl:grid grid-rows-auto grid-cols-2 gap-x-3 gap-y-2 z-[5] relative">
        {challenges.length === 0 && isLoading ? (
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
          challenges.map((challenge) => (
            <Challenge
              key={challenge.id}
              id={challenge.id}
              name={challenge.name}
              icon={challenge.icon}
              description={challenge.description}
              duration={challenge.duration}
              progress={challenge.progress}
              open={challenge.open}
              streak={challenge.streak}
              setChallengesRemount={setChallengesRemount}
              challengesRemount={challengesRemount}
              setHabitsRemount={setHabitsRemount}
              habitsRemount={habitsRemount}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))
        )}
        {challenges.length === 0 && !isLoading ? (
          <p className="p-3 px-5 rounded-2xl text-sm bg-[color:var(--error-bg)] text-opacity-50 col-span-2">
            Damn! You don&apos;t have any challenge, create new ones up here!
          </p>
        ) : null}
      </div>
      <button
        className="bg-[color:var(--bg-tertiary)] w-full py-3 px-5 rounded-2xl mt-3 withbefore"
        onClick={() => {
          window.scrollTo(0, 0);
          setInsertOpen(!insertOpen);
        }}
        disabled={challenges.length > 3 ? true : false}
      >
        <p className="font-semibold text-sm">
          {challenges.length > 3
            ? "You already have 4 challenges!"
            : "Create a challenge"}
        </p>
      </button>
    </div>
  );
}

export default Challenges;
