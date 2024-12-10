import React from "react";

function IconArrow({ width }) {
  return (
    <svg
      width={width ? width : 20}
      height={width ? width : 20}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10.25 6.75L4.75 12L10.25 17.25"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19.25 12H5"
      ></path>
    </svg>
  );
}

export default IconArrow;
