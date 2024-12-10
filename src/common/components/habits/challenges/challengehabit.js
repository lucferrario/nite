import React, { useState, useEffect, useContext } from "react";
import { BsCheck } from "react-icons/bs";
import axios from "axios";

function ChallengeHabit({ text, checked, id, habits, setHabits, location }) {
  const [currentText, setCurrentText] = useState(text);
  const [isChecked, setIsChecked] = useState(checked);
  const [checkStyle, setCheckStyle] = useState("");
  const [textStyle, setTextStyle] = useState("");

  //update styles on check
  useEffect(() => {
    if (isChecked) {
      setCheckStyle("bg-[color:var(--checkbox-selected)]");
    } else {
      setCheckStyle("bg-[color:var(--checkbox-primary)]");
    }
  }, [isChecked]);

  const toggleItems = () => {
    setIsChecked(!isChecked);
    const newHabits = habits?.map((habit) => {
      if (habit.id === id) {
        habit.checked = !habit.checked;
      }
      return habit;
    });
    setHabits(newHabits);
  };

  return (
    <div
      className={`w-full flex items-center relative box-border rounded-2xl p-4 py-3 group cursor-pointer ${
        location && location === "view"
          ? "bg-[color:var(--bg-habit)]"
          : "bg-[color:var(--bg-panel)]"
      }`}
    >
      <div
        className="relative flex justify-center items-center"
        onClick={() => {
          toggleItems();
        }}
      >
        <input
          type="checkbox"
          className={`${checkStyle} mr-4 w-5 h-5 align-middle rounded-md appearance-none outline-none cursor-pointer`}
        />
        {isChecked ? (
          <BsCheck
            size={20}
            className="absolute top-0 left-0 cursor-pointer text-[color:var(--inverted-color)]"
          />
        ) : (
          <></>
        )}
      </div>
      <div className={`w-full max-w-full pr-5`}>
        <p
          className={`${textStyle} text-sm transition-all duration-300 ease-in-out font-medium text-ellipsis whitespace-nowrap overflow-hidden pr-4`}
        >
          {currentText}
        </p>
      </div>
    </div>
  );
}

export default ChallengeHabit;
