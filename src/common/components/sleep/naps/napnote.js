import React from "react";

function NapNote({ note, setNote }) {
  return (
    <div className="rounded-2xl bg-[color:var(--bg-tertiary)] h-full p-3">
      <textarea
        name=""
        id=""
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
        placeholder="add a note..."
        className="w-full h-full outline-none bg-[color:var(--bg-tertiary)] text-sm resize-none"
      ></textarea>
    </div>
  );
}

export default NapNote;
