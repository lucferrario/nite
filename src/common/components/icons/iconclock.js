import React from "react";

function IconClock({ width }) {
  return (
    <svg
      width={width ? width : 20}
      height={width ? width : 20}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.5"
      ></circle>
      <path stroke="currentColor" strokeWidth="1.5" d="M12 8V12L14 14"></path>
    </svg>
  );
}

export default IconClock;
