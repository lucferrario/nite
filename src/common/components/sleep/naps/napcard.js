import React, { useState, useEffect } from "react";

function NapCard({ size, duration, setDuration, selected, setSelected }) {
  // size = small, big
  const [sizing, setSizing] = useState(size ? size : "small");
  const [style, setStyle] = useState(
    selected
      ? "bg-[color:var(--bg-tertiary)]"
      : "bg-[color:var(--bg-secondary)]"
  );

  useEffect(() => {
    setStyle(
      selected === duration
        ? "bg-[color:var(--bg-tertiary)]"
        : "bg-[color:var(--bg-secondary)]"
    );
  }, [selected]);

  return (
    <button
      className={`rounded-2xl ${
        sizing === "big" ? "col-span-2 withbefore" : "col-span-1"
      } flex justify-center items-center transition-all duration-200 ease-linear ${style}`}
      onClick={() => {
        setDuration(duration);
        setSelected(duration);
      }}
    >
      <p className="text-center font-medium">{duration} min</p>
    </button>
  );
}

export default NapCard;
