import React from "react";
import Header from "../header";

function Permissions({ active, setActive, qualityOpen, setQualityOpen }) {
  return (
    <div className="w-full h-full min-h-full box-border overflow-y-scroll rounded-3xl pt-8 p-5 relative 2xl:p-8">
      <Header active={active} setActive={setActive} />
    </div>
  );
}

export default Permissions;
