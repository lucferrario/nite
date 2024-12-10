import React from "react";

function IconJournal({ size }) {
  return (
    <svg
      width={size ? size : 16}
      height={size ? size : 16}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 21C5 12.811 7.93738 4.62198 16.4512 3.04288C18.1435 2.729 19.5662 4.19167 18.7756 5.68251C17.4442 8.19294 14.8776 9.85964 14.8776 9.85964C15.9575 10.6485 16.8582 11.9697 15.9618 13.2737C14.625 15.2185 11.7203 17.9617 5.97043 17.9617"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default IconJournal;
