import React, { useEffect, useRef } from "react";
import styles from "../../../styles/Welcome.module.css";
import IconArrow from "../icons/iconarrow";
import { useState } from "react";

function Welcome({ step, setStep, steps, onClose, name }) {
  // const containerRef = useRef(null);
  // const divRefs = [
  //   useRef(null),
  //   useRef(null),
  //   useRef(null),
  //   useRef(null),
  //   useRef(null),
  // ];

  const [buttonstyle, setButtonstyle] = useState(
    styles.button + " " + styles.fade
  );
  const [modalstyle, setModalstyle] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("Morning"); // Morning or Afternoon
  const [partoftheday, setPartoftheday] = useState("night");

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const divs = divRefs.map((ref) => ref.current);
  //   const numDivs = divs.length;
  //   const radius = 1;
  //   const center = {
  //     x: container.offsetWidth / 2 - 100,
  //     y: container.offsetHeight / 2 - 100,
  //   };
  //   const pi = Math.PI;
  //   let previousTime = 0;

  //   function updateTransform(currentTime) {
  //     const timeElapsed = currentTime - previousTime;

  //     if (timeElapsed > 16) {
  //       // throttle to 60 fps
  //       previousTime = currentTime;
  //       const angle = ((currentTime / 5000) * 360) % 360;

  //       for (let i = 0; i < numDivs; i++) {
  //         const divAngle = angle + (360 / numDivs) * i;
  //         const x = Math.cos((divAngle * pi) / 180) * radius;
  //         const y = Math.sin((divAngle * pi) / 180) * radius;

  //         divs[i].style.transform = `translate(${center.x + x}px, ${
  //           center.y + y - radius
  //         }px) rotate(${divAngle}deg) translate(-50%, -50%)`;
  //       }
  //     }

  //     requestAnimationFrame(updateTransform);
  //   }

  //   requestAnimationFrame(updateTransform);
  // }, [containerRef.current]);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      setTimeOfDay("Morning");
      setPartoftheday("night");
    }
    if (hour > 12 && hour < 18) {
      setTimeOfDay("Afternoon");
      setPartoftheday("day");
    }
    if (hour > 18 && hour < 24) {
      setTimeOfDay("Evening");
      setPartoftheday("day");
    }

    if (document.getElementById("splash")) {
      setTimeout(() => {
        setButtonstyle(styles.button + " " + styles.fade);
        setTimeout(() => {
          setButtonstyle(styles.button + " " + styles.active);
        }, 700);
      }, 1200);
    } else {
      setButtonstyle(styles.button + " " + styles.fade);
      setTimeout(() => {
        setButtonstyle(styles.button + " " + styles.active);
      }, 300);
    }
  }, []);

  return (
    <div
      className={`${modalstyle} w-full h-full relative flex overflow-hidden rounded-3xl bg-[color:var(--bg-color)] border-2 border-white/30 transition-all duration-200 ease-in-out`}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20"
        // ref={containerRef}
      >
        <div
          className={`${styles.circle} absolute bg-blue-500 w-80 h-80 rounded-full blur-3xl origin-right`}
          // ref={divRefs[0]}
        ></div>
        <div
          className={`${styles.circle} absolute bg-purple-500 w-80 h-80 rounded-full blur-3xl origin-center`}
          // ref={divRefs[1]}
        ></div>
        <div
          className={`${styles.circle} absolute bg-red-500/50 w-80 h-80 rounded-full blur-3xl origin-left`}
          // ref={divRefs[2]}
        ></div>
        <div
          className={`${styles.circle} absolute bg-cyan-400 w-80 h-80 rounded-full blur-3xl origin-top`}
          // ref={divRefs[4]}
        ></div>
        <div
          className={`${styles.circle} absolute bg-fuchsia-500 w-80 h-80 rounded-full blur-3xl origin-bottom`}
          // ref={divRefs[3]}
        ></div>
      </div>
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center">
        <p className="font-semibold text-3xl px-5 text-center w-full text-[color:var(--inverted-color)]">
          Good {timeOfDay}, {name}
        </p>
        <p className={`text-sm mt-1 text-[color:var(--inverted-color)]`}>
          We hope you had a wonderful {partoftheday}.
        </p>
      </div>
      <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center">
        <button
          className={buttonstyle}
          onClick={() => {
            if (step + 1 >= steps) onClose();
            else {
              setModalstyle(styles.modalfadeout);
              setTimeout(() => {
                setStep(step + 1);
              }, 200);
            }
          }}
        >
          <div className={styles.arrow}>
            <IconArrow />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Welcome;
