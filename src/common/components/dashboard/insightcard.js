import React, { useState, useEffect } from "react";
import Image from "next/image";

function InsightCard({ title, data, img, level }) {
  const [levelColor, setLevelColor] = useState("");

  useEffect(() => {
    if (level == "High") {
      setLevelColor("rgba(112, 224, 0, 0.1)");
    }
    if (level == "Medium") {
      setLevelColor("rgba(247, 184, 1, 0.1)");
    }
    if (level == "Low") {
      setLevelColor("rgba(255, 0, 0, 0.05)");
    }
  }, [level]);

  return (
    <div
      className="bg-[color:var(--bg-panel)] relative min-w-max w-60 mr-8 rounded-2xl py-4 px-6 pr-24 bg-cover bg-right bg-no-repeat md:w-full md:bg-cover xl:pr-6"
      // style={{ backgroundImage: `url(${img})`, minWidth: 200 }}
    >
      <div
        className="absolute top-4 right-4 rounded-full p-1 px-2"
        style={{ backgroundColor: levelColor }}
      >
        <p
          className="text-xs"
          style={{
            color:
              level == "High"
                ? "#70E000"
                : level == "Medium"
                ? "#F7B801"
                : "#FF0000",
          }}
        >
          {level}
        </p>
      </div>
      <p className="font-medium 2xl:text-base text-[color:var(--secondary-color)]">
        {title}
      </p>
      <p className="font-medium 2xl:text-lg">{data}</p>
    </div>
  );
}

export default InsightCard;
