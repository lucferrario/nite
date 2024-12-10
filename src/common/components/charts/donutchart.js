import React from "react";
import styles from "../../../styles/Donut.module.css";

function DonutChart(props) {
  let {
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = `--bg-color`,
    indicatorWidth = 10,
    indicatorColor = `#F9896B`,
    indicatorCap = `round`,
    label = `0%`,
    labelColor = `#333`,
  } = props;

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <>
      <div
        className={styles.svgpiwrapper}
        style={{ width: size + "px", height: size + "px" }}
      >
        <svg className={styles.svgpi} style={{ width: size, height: size }}>
          <circle
            className={styles.svgpitrack}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={styles.svgpiindicator}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>
        <div className={styles.svgpilabel}>
          <span className="font-bold text-sm">{label}</span>
        </div>
      </div>
    </>
  );
}

export default DonutChart;
