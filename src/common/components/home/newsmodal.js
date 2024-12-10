import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import demo from "../../../../public/images/demonw.jpg";
import styles from "../../../styles/Modal.module.css";

function NewsModal({ newsOpen, setNewsOpen }) {
  const [data, setData] = useState([
    {
      title: "Fostering Pro-Sleep Habits During the Day",
      img: "/img/demonw.png",
      preview:
        "Setting the table for high-quality sleep is an all-day affair. A handful of steps that you can take during the day can pave the way for better sleep at night.",
      content: {
        paragraphs: [
          {
            subtitle: "sub1",
            text: "text1",
          },
          {
            subtitle: "sub2",
            text: "text2",
          },
        ],
      },
    },
  ]);

  const [modalstyle, setModalstyle] = useState("");
  const [overlaystyle, setOverlaystyle] = useState("");

  const onClose = () => {
    setModalstyle(styles.modalclose);
    setOverlaystyle(styles.overlayclose);
    setTimeout(() => {
      setNewsOpen(false);
    }, 200);
  };

  if (!newsOpen) return null;
  return (
    <>
      {createPortal(
        <>
          <div
            className={`${overlaystyle} absolute top-0 left-0 overflow-hidden w-screen h-screen z-50 bg-black opacity-30 dark:opacity-50 transition-all duration-300 ease-in-out`}
            onClick={onClose}
          ></div>
          <div
            id="modal"
            className={`${modalstyle} bg-[color:var(--bg-panel)] box-border w-11/12 max-h-5/6 max-w-5/6 overflow-y-scroll flex m-auto z-50 p-3 rounded-3xl sm:w-10/12 sm:max-h-3/4 xl:w-2/3 2xl:w-3/5 max-w-[1150px] dark:shadow-md`}
          >
            <div className="flex flex-col box-border w-full">
              <div className="relative flex z-10">
                <IoClose
                  size={32}
                  onClick={onClose}
                  className="absolute right-2 top-2 cursor-pointer"
                />
              </div>
              <div className="relative mb-10">
                <Image
                  src={demo}
                  className="rounded-2xl w-full mt-15 relative"
                  alt="news img"
                />
                <div className="absolute bottom-2 right-2 h-10 aspect-square sm:bottom-5 sm:right-5 sm:h-12">
                  <Image src={logo} alt="logo" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-xl mb-5">
                  Fostering Pro-Sleep Habits During the Day
                </p>
                <p className="font-medium mt-5">• See the Light of Day</p>
                <p className="mt-2 text-sm text-[color:var(--secondary-color)]">
                  Our internal clocks are regulated by light exposure. Sunlight
                  has the strongest effect, so try to take in daylight by
                  getting outside or opening up windows or blinds to natural
                  light. Getting a dose of daylight early in the day can help
                  normalize your circadian rhythm. If natural light isn&apos;t
                  an option, you can talk with your doctor about using a light
                  therapy box.
                </p>
                <p className="font-medium mt-5">• Find Time to Move</p>
                <p className="mt-2 mb-5 text-sm text-[color:var(--secondary-color)]">
                  Daily exercise has across-the-board benefits for health, and
                  the changes it initiates in energy use and body temperature
                  can promote solid sleep. Most experts advise against intense
                  exercise close to bedtime because it may hinder your
                  body&apos;s ability to effectively settle down before sleep.
                </p>
                <p className="text-[color:var(--tertiary-color)] text-sm mb-5">
                  discover more{" "}
                  <a
                    href="https://www.sleepfoundation.org/sleep-hygiene/healthy-sleep-tips"
                    className="text-blue-700 dark:text-blue-900"
                  >
                    here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default NewsModal;
