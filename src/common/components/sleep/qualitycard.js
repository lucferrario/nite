import React, { useState, useEffect } from "react";

function QualityCard({ text, selected }) {
  const [style, setStyle] = useState();
  const [sel, setSel] = useState(selected);

  useEffect(() => {
    if (sel)
      setStyle(
        "pl-3 pr-5 py-[10px] rounded-2xl mr-2 mt-2 cursor-pointer whitespace-nowrap w-fit inline-block bg-[color:var(--card-selected)]"
      );
    else
      setStyle(
        "pl-3 pr-5 py-[10px] rounded-2xl mr-2 mt-2 cursor-pointer whitespace-nowrap w-fit inline-block bg-[color:var(--card-primary)]"
      );
  }, [sel]);

  return (
    <div onClick={() => setSel(!sel)}>
      <div className={style}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default QualityCard;
