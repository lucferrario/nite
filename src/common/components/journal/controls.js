import React from "react";
import IconDelete from "../icons/icondelete";
import IconPlus from "../icons/iconplus";
import axios from "axios";

function Controls({ activeId, trigger, setTrigger, clearEditor }) {
  return (
    <div className="flex gap-3">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-2xl bg-red-600/20 hover:bg-red-600/25 transition-all duration-500 text-[color:var(--error-color)]"
        onClick={() => {
          if (activeId) {
            clearEditor();
            axios
              .delete(`/api/journal?id=${activeId}`)
              .then((res) => {
                if (!res.data.error) {
                  setTrigger(Math.random());
                } else {
                  console.error(res.data.error);
                }
              })
              .catch((err) => console.error(err));
          }
        }}
      >
        <IconDelete className="w-5 h-5" />
      </button>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-2xl hover:bg-[color:var(--bg-color)] transition-all duration-500"
        onClick={clearEditor}
      >
        <IconPlus className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Controls;
