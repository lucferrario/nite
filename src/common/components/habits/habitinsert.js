import React, { useState, useRef, useContext, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import AlertContext from "../../contexts/alertcontext";

function HabitInsert({ setCreatedHabit, setRemount, enabled }) {
  const [habit, setHabit] = useState("");
  const [id, setId] = useState();
  const { alertText, setAlert, setAlertType } = useContext(AlertContext);

  useEffect(() => {
    axios.get("/api/habits").then((response) => {
      setId(response.data.data.length);
    });
  }, []);

  const addHabit = async () => {
    setHabit("");
    await axios
      .post("/api/habits", {
        name: habit,
      })
      .then(() => {
        setAlertType("standard");
        setAlert("Added habit successfully");
        //remount habit list component
        setRemount(Math.random());
      })
      .catch((err) => {
        setAlert("Failed to add habit");
        setAlertType("error");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addHabit();
  };

  return (
    <div className="bg-[color:var(--bg-tertiary)] w-full flex items-center relative box-border rounded-2xl p-5 py-[10px] group z-50">
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder={
            enabled
              ? "Write a new task..."
              : "Hey! Focus on your already existing habits!"
          }
          className="peer bg-[color:var(--bg-tertiary)] placeholder:text-[color:var(--secondary-color)] w-full text-sm font-medium outline-none focus:outline-none"
          onChange={(e) => {
            setHabit(e.target.value);
          }}
          value={habit}
          disabled={enabled ? false : true}
        ></input>
        <div className="absolute flex invisible right-2 top-0 h-full items-center opacity-0 peer-focus:visible peer-focus:opacity-100 group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out">
          <button
            type="submit"
            className="flex bg-[color:var(--bg-secondary)] p-2 rounded-xl w-8 h-8 justify-center items-center"
          >
            <FiPlus className="text-[color:var(--secondary-color)]" size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default HabitInsert;
