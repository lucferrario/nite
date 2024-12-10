import React, { useState, useEffect, useRef, useContext } from "react";
import QualityCard from "../sleep/qualitycard";
import axios from "axios";
import AlertContext from "../../contexts/alertcontext";
import IconArrow from "../icons/iconarrow";
import styles from "../../../styles/Welcome.module.css";

function Quality({ step, setStep, steps, onClose, name }) {
  const { setAlert, setAlertType } = useContext(AlertContext);

  const [data, setData] = useState([
    { name: "⚡ Energetic", selected: false },
    { name: "😴 Tired", selected: false },
    { name: "👌 Normal", selected: false },
    { name: "🙃 Okay", selected: false },
    { name: "😄 Happy", selected: false },
    { name: "🧘‍♂️ Calm", selected: false },
    { name: "😔 Sad", selected: false },
    { name: "😩 Stressed", selected: false },
  ]);

  const [modalstyle, setModalstyle] = useState("");

  useEffect(() => {
    //fetch hour format and already submitted data
    axios
      .get("/api/sleep", {
        params: {
          filter: "day-dailyModal",
        },
      })
      .then((res) => {
        if (res.data.filteredSleep[0] && res.data.filteredSleep[0].report) {
          const selData = res.data.filteredSleep[0].report.split(",");
          const newData = { ...data };
          for (let i = 0; i < data.length; i++) {
            if (selData[i] === "true") {
              newData[i].selected = true;
            }
          }
          const arr = Object.values(newData);
          setData([...arr]);
        }
      });
  }, []);

  const submitData = async () => {
    const reportArray = data.map((item) => item.selected);

    axios
      .post("/api/sleep", { report: reportArray.join(",") })
      .then((res) => {})
      .catch((err) => {
        setAlert("Something went wrong");
        setAlertType("error");
      });
  };

  return (
    <div
      className={`${modalstyle} relative w-full h-full transition-all duration-200 ease-in-out flex flex-col`}
    >
      <p className="font-semibold text-xl mt-2">
        Hi, {name}
        👋
      </p>
      <p className="mt-2 text-sm dark:text-white">How are you feeling today?</p>
      <div className="max-w-max box-border mt-8 mb-4">
        <div className="box-border grid-cols-2 gap-y-2">
          {data
            ? data.map((item, i) => (
                <button
                  key={item.name + item.selected}
                  onClick={() => {
                    const newData = data;
                    newData[i].selected = !newData[i].selected;
                    setData(newData);
                  }}
                >
                  <QualityCard text={item.name} selected={item.selected} />
                </button>
              ))
            : null}
        </div>
      </div>
      <div className="absolute flex bottom-0">
        <button
          className="rounded-2xl bg-[color:var(--button-secondary)] px-4 py-3"
          onClick={() => {
            setModalstyle(styles.modalfadein);
            setTimeout(() => {
              setStep(step - 1);
            }, 200);
          }}
        >
          <div className="">
            <IconArrow />
          </div>
        </button>
        <button
          className="flex justify-evenly items-center rounded-2xl bg-[color:var(--button-primary)] text-white px-6 py-3 ml-2"
          onClick={() => {
            submitData();
            if (step + 1 >= steps) onClose();
            else {
              setModalstyle(styles.modalfadeout);
              setTimeout(() => {
                setStep(step + 1);
              }, 200);
            }
          }}
        >
          <p className="font-semibold text-[color:var(--inverted-color)]">
            Next
          </p>
          <div className="rotate-180 ml-2 text-[color:var(--inverted-color)]">
            <IconArrow />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Quality;
