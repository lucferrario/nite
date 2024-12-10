import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Picker({
  isOpen,
  setIsOpen,
  selHours,
  selMinutes,
  setSelHours,
  setSelMinutes,
  ampm,
  setAmpm,
  hourFormat,
  parent,
}) {
  const hours =
    hourFormat == "12h"
      ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      : [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23,
        ];
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const periods = ["am", "pm"];

  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);
  const [period, setPeriod] = useState("am");

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const periodRef = useRef(null);

  //on click outiside the picker, close it
  useEffect(() => {
    const time = new Date();
    setSelHours(time.getHours());
    setSelMinutes(time.getMinutes());

    const handleClickOutside = (e) => {
      if (!e.target.closest("#pickermodal")) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selHours && selMinutes) {
      //get closest value to the selected time
      const closestHour = hours.reduce((a, b) => {
        return Math.abs(b - selHours) < Math.abs(a - selHours) ? b : a;
      });
      const closestMinute = minutes.reduce((a, b) => {
        return Math.abs(b - selMinutes) < Math.abs(a - selMinutes) ? b : a;
      });
      //set the indexes of the closest values
      setHourIndex(hours.indexOf(closestHour));
      setMinuteIndex(minutes.indexOf(closestMinute));
      setPeriod(ampm);
    }
  }, [selHours, selMinutes, hours, minutes, ampm]);

  useEffect(() => {
    if (hourRef.current) hourRef.current.scrollIntoView({ block: "center" });
    if (minuteRef.current)
      minuteRef.current.scrollIntoView({ block: "center" });
    if (periodRef.current)
      periodRef.current.scrollIntoView({ block: "center" });
  }, [hourRef, minuteRef, hourIndex, minuteIndex, period, isOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            id="pickermodal"
            className="absolute flex right-0 top-12 gap-2 rounded-2xl bg-[color:var(--card-primary)] p-2 max-w-fit justify-center items-center z-20"
          >
            <div className="w-12 max-h-32 overflow-y-scroll custom-scroll z-10">
              {hours.map((h, i) => (
                <div
                  key={i}
                  className={`${
                    hourIndex === i ? "bg-[color:var(--bg-tertiary)]" : ""
                  } rounded-xl flex justify-center items-center p-1 cursor-pointer`}
                  onClick={() => {
                    setHourIndex(i);
                    setSelHours(h);
                  }}
                  ref={hourIndex === i ? hourRef : null}
                >
                  <p className={`${hourIndex === i ? "font-medium" : ""}`}>
                    {h}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-12 max-h-32 overflow-y-scroll custom-scroll">
              {minutes.map((m, i) => (
                <div
                  key={i}
                  className={`${
                    minuteIndex === i ? "bg-[color:var(--bg-tertiary)]" : ""
                  } rounded-xl flex justify-center items-center p-1 cursor-pointer`}
                  onClick={() => {
                    setMinuteIndex(i);
                    setSelMinutes(m);
                  }}
                  ref={minuteIndex === i ? minuteRef : null}
                >
                  <p className={`${minuteIndex === i ? "font-medium" : ""}`}>
                    {m}
                  </p>
                </div>
              ))}
            </div>
            {hourFormat == "12h" && (
              <div className="w-12 max-h-32 overflow-y-scroll custom-scroll">
                <div
                  key={"am"}
                  className={`${
                    period === "am" ? "bg-[color:var(--bg-tertiary)]" : ""
                  } rounded-xl flex justify-center items-center p-1 cursor-pointer`}
                  onClick={() => {
                    setPeriod("am");
                    setAmpm("am");
                  }}
                  ref={period === "am" ? periodRef : null}
                >
                  <p>am</p>
                </div>
                <div
                  key={"pm"}
                  className={`${
                    period === "pm" ? "bg-[color:var(--bg-tertiary)]" : ""
                  } rounded-xl flex justify-center items-center p-1 cursor-pointer`}
                  onClick={() => {
                    setPeriod("pm");
                    setAmpm("pm");
                  }}
                  ref={period === "pm" ? periodRef : null}
                >
                  <p>pm</p>
                </div>
              </div>
            )}
          </div>,
          document.getElementById(parent)
            ? document.getElementById(parent)
            : document.getElementById("clock")
        )}
    </>
  );
}

export default Picker;
