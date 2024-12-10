import React, { useState, useEffect } from "react";

function Blurred({ left }) {
  const [color, setColor] = useState("#c542f5");

  useEffect(() => {
    document.documentElement.style.setProperty("--beforeColor", color);
  }, [color]);

  useEffect(() => {
    const date = new Date();

    if (date.getHours() >= 4 && date.getHours() < 8) {
      setColor("#f5c542");
    } else if (date.getHours() >= 8 && date.getHours() < 12) {
      setColor("#5294ff");
    } else if (date.getHours() >= 12 && date.getHours() < 16) {
      setColor("#ffd900");
    } else if (date.getHours() >= 16 && date.getHours() < 20) {
      setColor("#ff9100");
    } else if (date.getHours() >= 20 && date.getHours() < 22) {
      setColor("#c542f5");
    } else if (date.getHours() >= 22 || date.getHours() < 4) {
      setColor("#050063");
    }
  }, []);

  return (
    <div
      className={`fixed left-[5%] lg:left-[${left}] bottom-0 lg:top-0 opacity-20 rounded-full w-3/4 h-64 transition-all duration-300 ease-linear z-0`}
      id="blurred"
    ></div>
  );
}

export default Blurred;
