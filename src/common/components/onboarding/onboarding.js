import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Indicator from "./indicator";
import axios from "axios";

function Onboarding({ open, setOpen, customClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();

  const setOnboarding = (onboard) => {
    axios
      .post("/api/setonboarding", {
        onboard: onboard,
      })
      .then(() => {
        customClose();
      })
      .catch(() => {
        setAlert("An error occured");
        setAlertType("error");
      });
  };

  if (!open) return null;
  return (
    <div
      className={
        "overflow-x-hidden snap-x snap-mandatory w-[90vw] max-h-[80vh] overflow-hidden z-[55] bg-white rounded-3xl sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[30vw] max-w-[500px] dark:shadow-md transition-all duration-300 ease-in-out"
      }
    >
      <div className="flex w-full">
        <div
          className="relative min-w-full sm:w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 max-w-[500px] snap-center"
          ref={firstRef}
        >
          <Image
            src={"/images/onboarding1.png"}
            alt="Onboarding background"
            layout="responsive"
            width={500}
            height={250}
          ></Image>
          <div className="p-10 pt-5 justify-center dark:text-black">
            <h1 className="font-semibold text-lg lg:text-xl mb-3">
              Welcome to nite
            </h1>
            <p className="text-sm lg:text-base mb-10">
              Nite is a web app built to help people who suffer from insomnia
              and sleeping issues.
            </p>
            <button
              onClick={() => {
                secondRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
                setCurrentIndex(1);
              }}
              className="bg-[#F35C6E] text-sm lg:text-base rounded-2xl px-5 py-3 text-white"
            >
              Continue
            </button>
          </div>
        </div>
        <div
          className="relative min-w-full sm:w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 max-w-[500px] snap-center"
          ref={secondRef}
        >
          <Image
            src={"/images/onboarding2.png"}
            alt="Onboarding background"
            layout="responsive"
            width={500}
            height={250}
          ></Image>
          <div className="p-10 pt-5 justify-center dark:text-black">
            <h1 className="font-semibold text-lg lg:text-xl mb-3">
              Track your habits
            </h1>
            <p className="text-sm lg:text-base mb-10">
              Set your goals and track your progress every day.
              <br />
              We will help you stick with that.
            </p>
            <button
              onClick={() => {
                thirdRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
                setCurrentIndex(2);
              }}
              className="bg-[#F35C6E] text-sm lg:text-base rounded-2xl px-5 py-3 text-white"
            >
              Continue
            </button>
          </div>
        </div>
        <div
          className="relative min-w-full sm:w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 max-w-[500px] snap-center"
          ref={thirdRef}
        >
          <Image
            src={"/images/onboarding3.png"}
            alt="Onboarding background"
            layout="responsive"
            width={500}
            height={250}
          ></Image>
          <div className="p-10 pt-5 justify-center dark:text-black">
            <h1 className="font-semibold text-lg lg:text-xl mb-3">
              Sleep better
            </h1>
            <p className="text-sm lg:text-base mb-10">
              Nite will help you create and understand your own customised sleep
              patterns.
            </p>
            <button
              onClick={() => {
                setOnboarding(true);
              }}
              className="bg-[#F35C6E] text-sm lg:text-base rounded-2xl px-5 py-3 text-white"
            >
              Get started
            </button>
          </div>
        </div>
      </div>

      <div className="sticky bottom-8 left-0 w-full">
        <Indicator count={3} current={currentIndex} />
      </div>
    </div>
  );
}

export default Onboarding;
