import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
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
}) {
  const hours = [...Array(12).keys()].map((h) => (h === 0 ? 12 : h));
  const minutes = [...Array(12).keys()].map((m) => m * 5);
  const periods = ["AM", "PM"];

  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);
  const [periodIndex, setPeriodIndex] = useState(0);

  const hourRef = useRef();
  const minuteRef = useRef();
  const periodRef = useRef();

  const scroll = (ref, index) => {
    //when item is clicked, scroll that item in the center
    const itemHeight = ref.current.children[0].clientHeight;
    ref.current.scrollTo(0, itemHeight * index - itemHeight * 2, {
      behavior: "smooth",
    });
  };

  const handleHourClick = (index) => {
    setHourIndex(index);
    scroll(hourRef, index);
    setSelHours(hours[index]);
  };

  const handleMinuteClick = (index) => {
    setMinuteIndex(index);
    scroll(minuteRef, index);
    setSelMinutes(minutes[index]);
  };

  const handlePeriodClick = (index) => {
    setPeriodIndex(index);
    scroll(periodRef, index);
  };

  useLayoutEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTo(0, 96 * hourIndex - 96 * 2, {
        behavior: "smooth",
      });
    }

    if (minuteRef.current) {
      minuteRef.current.scrollTo(0, 48 * minuteIndex - 48 * 2, {
        behavior: "smooth",
      });
    }

    if (periodRef.current) {
      periodRef.current.scrollTo(0, 16 * periodIndex - 16 * 2, {
        behavior: "smooth",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //on click outiside the picker, close it
  useEffect(() => {
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

  useEffect(() => {}, []);

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            id="pickermodal"
            className="absolute flex right-0 top-12 gap-2 rounded-2xl bg-gray-100 p-2 max-w-fit justify-center items-center"
          >
            <div className="flex flex-col rounded-xl bg-gray-200 p-2 gap-1 overflow-hidden">
              <div
                className="flex flex-col max-h-24 overflow-y-scroll"
                ref={hourRef}
              >
                {hours.map((hour, index) => (
                  <button
                    key={hour}
                    className={`font-medium text-sm ${
                      hourIndex === index ? "font-semibold" : "text-gray-400"
                    }`}
                    onClick={() => handleHourClick(index)}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col rounded-xl bg-gray-200 p-2 gap-1 overflow-hidden">
              <div
                className="flex flex-col max-h-24 overflow-y-scroll"
                ref={minuteRef}
              >
                {minutes.map((minute, index) => (
                  <button
                    key={minute}
                    className={`font-medium text-sm ${
                      minuteIndex === index ? "font-semibold" : "text-gray-400"
                    }`}
                    onClick={() => handleMinuteClick(index)}
                  >
                    {minute < 10 ? "0" + minute : minute}
                  </button>
                ))}
              </div>
            </div>
            {/* <div className="flex flex-col rounded-xl bg-gray-200 p-2 gap-1 max-h-14 overflow-hidden">
              <div
                className="flex flex-col max-h-24 overflow-y-scroll"
                ref={periodRef}
              >
                {periods.map((period, index) => (
                  <button
                    key={period}
                    className={`font-medium text-xs ${
                      periodIndex === index ? "font-semibold" : "text-gray-400"
                    }`}
                    onClick={() => handlePeriodClick(index)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div> */}
          </div>,
          clock
        )}
    </>
  );
}

export default Picker;
