import React from "react";

function IconCopy({ width, color }) {
  return (
    <svg
      width={width ? width : 20}
      height={width ? width : 20}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color ? color : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"
      ></path>
      <rect
        width="10.5"
        height="10.5"
        x="8.75"
        y="8.75"
        stroke={color ? color : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        rx="2"
      ></rect>
    </svg>
  );
}

export default IconCopy;
