import React from "react";
import { FadeLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center">
      <FadeLoader />
    </div>
  );
}

export default Spinner;
