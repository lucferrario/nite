import React from "react";

function IconTrash({ size, color }) {
  return (
    <div>
      <svg
        width={size ? size : 16}
        height={size ? size : 16}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke={color ? color : "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6.75 7.75L7.59115 17.4233C7.68102 18.4568 8.54622 19.25 9.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75"
        ></path>
        <path
          stroke={color ? color : "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.75 7.5V6.75C9.75 5.64543 10.6454 4.75 11.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.5"
        ></path>
        <path
          stroke={color ? color : "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5 7.75H19"
        ></path>
      </svg>
    </div>
  );
}

export default IconTrash;