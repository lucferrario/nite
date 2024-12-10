import React from "react";
import { useSession } from "next-auth/react";

function ResetOrDelete({
  resetOrDeleteOpen,
  setResetOrDeleteOpen,
  resetChallenge,
  deleteChallenge,
}) {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1 className="font-semibold text-xl text-center">
        You did a wonderful job,{" "}
        {session.user.name ? session.user.name.split(" ")[0] : "user"}
      </h1>
      <p className="font-medium text-center">
        What do you plan to do now with this challenge?
      </p>
      <div className="flex flex-row gap-4 mt-8">
        <button
          className="w-full bg-[color:var(--button-secondary)] rounded-2xl py-2 px-4 font-semibold"
          onClick={resetChallenge}
        >
          Reset
        </button>
        <button
          className="w-full bg-[color:var(--button-secondary)] rounded-2xl py-2 px-4 font-semibold"
          onClick={deleteChallenge}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ResetOrDelete;
