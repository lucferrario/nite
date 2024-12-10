import React from "react";
import IconDelete from "../icons/icondelete";
import IconPlus from "../icons/iconplus";

function Controls() {
  return (
    <div className="flex gap-3">
      <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-red-600/20 hover:bg-red-600/25 transition-all duration-500 text-[color:var(--error-color)]">
        <IconDelete className="w-5 h-5" />
      </button>
      <button className="flex items-center justify-center w-10 h-10 rounded-2xl hover:bg-[color:var(--bg-color)] transition-all duration-500">
        <IconPlus className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Controls;
