import React from "react";
import { Tooltip as Tip } from "@mui/material";

function Tooltip({ title, children, placement }) {
  return (
    <Tip
      title={<p className="text-white dark:text-black">{title}</p>}
      placement={placement}
    >
      {children}
    </Tip>
  );
}

export default Tooltip;
