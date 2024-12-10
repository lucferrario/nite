import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Picker({
  isOpen,
  setIsOpen,
  parent,
  selectedValue,
  setSelectedValue,
}) {
  const values = Array.from(Array(50).keys()).map((i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#challengepicker")) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valueRef = useRef(null);

  useEffect(() => {
    if (selectedValue) {
      const closestValue = values.reduce((a, b) => {
        return Math.abs(b - selectedValue) < Math.abs(a - selectedValue)
          ? b
          : a;
      });
      setSelectedValue(closestValue);
    }

    if (valueRef.current) valueRef.current.scrollIntoView({ block: "center" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            id="challengepicker"
            className="absolute flex right-0 top-12 gap-2 rounded-2xl bg-[color:var(--card-primary)] p-2 max-w-fit justify-center items-center z-20 shadow-sm"
          >
            <div className="w-12 max-h-32 overflow-y-scroll z-10">
              {values.map((i) => (
                <div
                  key={i}
                  className={`${
                    selectedValue === i ? "bg-[color:var(--bg-tertiary)]" : ""
                  } rounded-xl flex justify-center items-center p-1 cursor-pointer`}
                  onClick={() => {
                    setSelectedValue(i);
                  }}
                  ref={selectedValue === i ? valueRef : null}
                >
                  <p className={`${selectedValue === i ? "font-medium" : ""}`}>
                    {i}
                  </p>
                </div>
              ))}
            </div>
          </div>,
          document.getElementById(parent)
        )}
    </>
  );
}

export default Picker;
