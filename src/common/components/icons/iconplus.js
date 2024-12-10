import React from "react";

function IconPlus({ size }) {
  return (
    <svg
      width={size ? size : 16}
      height={size ? size : 16}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M12 7V12M12 12V17M12 12H7M12 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  );
}

export default IconPlus;
