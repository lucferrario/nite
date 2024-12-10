import React, { useContext, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AlertContext from "../contexts/alertcontext";

function Alert() {
  const { alertText, clearAlert, alertType } = useContext(AlertContext);
  const [textColor, setTextColor] = useState(
    "text-neutral-300 dark:text-neutral-800"
  );
  const [alertStyle, setAlertStyle] = useState("");
  const [alertTimer, setAlertTimer] = useState(null);

  useEffect(() => {
    if (alertType === "error") {
      setTextColor("text-red-500");
    } else if (alertType === "standard") {
      setTextColor("text-neutral-300 dark:text-neutral-800");
    }
  }, [alertType]);

  function clear() {
    clearAlert();
  }

  useEffect(() => {
    if (alertText) {
      setAlertStyle("!opacity-100");
      //if timer already started, take it back to 3000ms
      if (alertTimer) {
        clearTimeout(alertTimer);
      }
      setAlertTimer(
        setTimeout(() => {
          setAlertStyle("");
          setTimeout(() => {
            clear();
          }, 300);
        }, 3300)
      );
    }
  }, [alertText]);

  if (alertText)
    return (
      <div
        className={`${alertStyle} opacity-0 w-full fixed bottom-12 right-0 flex justify-center items-center z-[100] lg:bottom-20 transition-all duration-300 ease-in-out`}
      >
        <div className="px-6 py-3 bg-[color:var(--secondary-color)] rounded-[20px] flex justify-between items-center shadow-sm">
          <p className={`font-semibold text-sm mr-12 ${textColor}`}>
            {alertText}
          </p>
          <IoClose
            size={22}
            className="cursor-pointer text-neutral-300 hover:text-neutral-100 dark:text-neutral-800"
            onClick={clear}
          />
        </div>
      </div>
    );
}

export default Alert;
