import React, { useState, useEffect, useContext } from "react";
import styles from "../../../../styles/Modal.module.css";
import { createPortal } from "react-dom";
import AlertContext from "../../../contexts/alertcontext";
import axios from "axios";

function ConfirmDeletion({
  confirmationOpen,
  setConfirmationOpen,
  id,
  setChallengesRemount,
  setHabitsRemount,
  customClose,
}) {
  const { setAlert, setAlertType } = useContext(AlertContext);

  const onClose = () => {
    customClose();
  };

  const confirm = async () => {
    axios
      .delete("/api/habits", { data: { id: id, confirm: true } })
      .then((res) => {
        onClose();
        setHabitsRemount(Math.random());
        setChallengesRemount(Math.random());
        setAlert("Habit deleted successfully!");
        setAlertType("standard");
      });
  };

  if (!confirmationOpen) return null;
  return (
    <div
      className={`p-5 w-[90vw] max-h-[80vh] rounded-3xl sm:w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] max-w-[1150px] bg-[color:var(--bg-panel)] dark:shadow-md`}
    >
      <p className="text-center mb-4">
        This is the last habit of the challenge. Deleting it will delete the
        challenge as well. Are you sure you want to delete it?
      </p>
      <div className="flex gap-5 w-full">
        <button
          className="rounded-xl py-2 px-4 bg-[color:var(--button-secondary)] w-full font-medium"
          onClick={() => {
            onClose();
            setAlertType("standard");
            setAlert("You're safe ;)");
          }}
        >
          No
        </button>
        <button
          className="rounded-xl py-2 px-4 bg-[color:var(--button-secondary)] w-full font-medium"
          onClick={confirm}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeletion;
