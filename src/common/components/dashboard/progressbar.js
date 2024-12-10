import React from "react";
import styles from "../../../styles/Progress.module.css";

function ProgressBar({ text, progress }) {
  const center = 72,
    radius = 60,
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <div className="my-2 w-full h-full flex flex-col justify-center items-center">
      <div className="relative rounded-full w-36 h-36" id={styles.outer}>
        <div
          className="rounded-full m-6 w-24 h-24 flex justify-center items-center"
          id={styles.inner}
        >
          <p className="font-bold text-lg dark:text-white">{text}</p>
        </div>
        <svg width="160px" height="160px" className={styles.svg}>
          <defs>
            <linearGradient id="gradient">
              <stop offset={"0%"} stopColor="#F9896B" />
              <stop offset={"100%"} stopColor="#5C3E84" />
              {/* <stop offset={"0%"} stopColor="#e1c8ef" />
              <stop offset={"100%"} stopColor="#a3e1e9" /> */}
            </linearGradient>
          </defs>
          <circle
            className={styles.circle}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            strokeLinecap={"round"}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
    </div>
  );
}

export default ProgressBar;
