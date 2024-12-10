import React, { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import axios from "axios";
import alertContext from "../../contexts/alertcontext";
import Welcome from "./welcome";
import Quality from "./quality";
import Time from "./time";
import styles from "../../../styles/Welcome.module.css";

function DailyModal({ qualityOpen, setQualityOpen, customClose }) {
  const { data: session, status } = useSession();

  const [step, setStep] = useState(0);
  const { setAlert, setAlertType } = useContext(alertContext);

  const steps = [
    <Welcome
      step={step}
      setStep={setStep}
      onClose={customClose}
      steps={3}
      name={
        status === "authenticated" ? session.user.name.split(" ")[0] : "Guest"
      }
      key={0}
    />,
    <Quality
      step={step}
      setStep={setStep}
      onClose={customClose}
      steps={3}
      name={
        status === "authenticated" ? session.user.name.split(" ")[0] : "Guest"
      }
      key={1}
    />,
    <Time
      step={step}
      setStep={setStep}
      onClose={customClose}
      steps={3}
      name={
        status === "authenticated" ? session.user.name.split(" ")[0] : "Guest"
      }
      key={2}
    />,
  ];

  if (!qualityOpen) return null;
  return (
    <>
      <div
        className={`${
          step > 0 && "p-5"
        } h-[26rem] w-[25rem] max-w-[90vw] max-h-5/6 max-w-5/6 z-50 rounded-3xl bg-[color:var(--bg-panel)] dark:shadow-md`}
      >
        <div className={`w-full h-full ${step === 0 && "rounded-3xl"}`}>
          {steps[step]}
        </div>
      </div>
    </>
  );
}

export default DailyModal;
