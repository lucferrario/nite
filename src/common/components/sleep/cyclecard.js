import React, { useContext } from "react";
import axios from "axios";
import AlertContext from "../../contexts/alertcontext";

const date = new Date();
date.setDate(date.getDate() + 1);

function CycleCard({ cycles, hours, img, start, end }) {
  const { alertText, setAlert, setAlertType } = useContext(AlertContext);

  return (
    <div
      className="flex flex-col p-3 mb-2 mt-2 rounded-2xl bg-cover bg-no-repeat bg-[color:var(--bg-tertiary)]"
      style={{ backgroundImage: `url(${img})` }}
    >
      <p className="dark:text-white">
        {cycles} full cycles, Corresponding to {hours} hours of sleep
      </p>
      <button
        className="mt-3 px-4 py-1 text-left w-fit rounded-2xl text-[color:var(--text-inverted)] bg-[color:var(--button-primary)] transition-all duration-200 ease-linear"
        onClick={() => {
          axios
            .post("/api/sleep", {
              start: start.getTime(),
              end: end.getTime(),
              forDate: date.toISOString().split("T")[0],
            })
            .then(() => {
              setAlertType("standard");
              setAlert("Sleep cycle successfully selected!");
            })
            .catch((err) => {
              setAlert(err.message);
              setAlertType("error");
            });
        }}
      >
        <p className="text-[color:var(--inverted-color)]">Select</p>
      </button>
    </div>
  );
}

export default CycleCard;
