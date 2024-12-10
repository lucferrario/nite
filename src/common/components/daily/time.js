import React, { useState, useEffect, useRef, useContext } from "react";
import IconClock from "../icons/iconclock";
import Picker from "../picker";
import axios from "axios";
import AlertContext from "../../contexts/alertcontext";
import RemountContext from "../../contexts/remount";
import IconArrow from "../icons/iconarrow";
import styles from "../../../styles/Welcome.module.css";

function Time({ step, setStep, steps, onClose, name }) {
  const { setAlert, setAlertType } = useContext(AlertContext);
  const { setHomeStatsRemount, homeStatsRemount } = useContext(RemountContext);
  const [hourFormat, setHourFormat] = useState("12h");
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);
  const [modalstyle, setModalstyle] = useState("");

  const [startSleep, setStartSleep] = useState(null);
  const [endSleep, setEndSleep] = useState(null);

  const [startHours, setStartHours] = useState("");
  const [startMins, setStartMins] = useState("");
  const [startAmpm, setStartAmpm] = useState("pm");

  const [endHours, setEndHours] = useState("");
  const [endMins, setEndMins] = useState("");
  const [endAmpm, setEndAmpm] = useState("am");

  function toDate(hours, minutes, ampm) {
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    if (hourFormat == "12h") {
      date.setHours(hours + (ampm == "pm" ? 12 : 0));
    }
    return date;
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  useEffect(() => {
    axios
      .get("api/user", {
        params: {
          filter: "getHourFormat",
        },
      })
      .then((res) => {
        setHourFormat(res.data.hourFormat);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/sleep", { params: { filter: "day-dailyModal" } })
      .then((res) => {
        const start = res?.data?.filteredSleep[0]?.start ?? null;
        const end = res?.data?.filteredSleep[0]?.end ?? null;

        const sdate = new Date(parseInt(start));
        const edate = new Date(parseInt(end));

        if (start && end) {
          setStartSleep(sdate);
          setEndSleep(edate);

          setStartHours(sdate.getHours());
          setStartMins(sdate.getMinutes());
          setEndHours(edate.getHours());
          setEndMins(edate.getMinutes());

          if (hourFormat == "12h") {
            setStartAmpm(formatAMPM(sdate).split(" ")[1]);
            setStartAmpm(formatAMPM(edate).split(" ")[1]);
          }
        }
      });
  }, []);

  const submitData = async () => {
    let sdate;
    let edate;

    if (
      (startHours || startHours == 0) &&
      (endHours || endHours == 0) &&
      (startMins || startMins == 0) &&
      (endMins || endMins == 0) &&
      startHours <= 23 &&
      startHours >= 0 &&
      startMins <= 59 &&
      startMins >= 0 &&
      endHours <= 23 &&
      endHours >= 0 &&
      endMins <= 59 &&
      endMins >= 0
    ) {
      sdate = new Date();
      edate = new Date();

      sdate.setHours(startHours);
      sdate.setMinutes(startMins);
      edate.setHours(endHours);
      edate.setMinutes(endMins);

      if (hourFormat === "12h" && startAmpm === "pm") {
        sdate.setHours(sdate.getHours() + 12);
        if (endAmpm === "pm") edate.setHours(edate.getHours() + 12);
        else sdate.setDate(sdate.getDate() - 1);
      }
      if (hourFormat === "24h") {
        if (sdate.getHours() > edate.getHours()) {
          sdate.setDate(sdate.getDate() - 1);
        }
      }
      if (sdate.getTime() > edate.getTime()) sdate.setDate(sdate.getDate() - 1);

      setStartSleep(sdate.getTime().toString());
      setEndSleep(edate.getTime().toString());
    } else {
      setAlert("Insert a valid time!");
      setAlertType("error");
      return;
    }

    axios
      .put("/api/sleep", {
        start: sdate.getTime(),
        end: edate.getTime(),
      })
      .catch(() => {
        setAlert("Something went wrong!");
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
      <p className="mt-2 text-sm">How was your sleep schedule?</p>
      <div className="box-border mt-6 mb-4 w-full">
        <div className="rounded-2xl bg-[color:var(--bg-sidebar)] p-2">
          <p className="font-medium mb-2 pl-2">Start</p>
          <div
            className="flex rounded-2xl bg-[color:var(--bg-tertiary)] p-[6px] w-full justify-between relative cursor-pointer"
            id="start-clock"
            onClick={() => setStartPickerOpen(true)}
          >
            <button className="px-4 font-medium">
              {hourFormat == "12h" ? (
                <>{formatAMPM(toDate(startHours, startMins, startAmpm))}</>
              ) : (
                <>
                  {startHours && startHours !== "" ? (
                    <>
                      {startHours.toString().split("").length == 2
                        ? startHours
                        : "0" + startHours}
                    </>
                  ) : (
                    "00"
                  )}
                  :
                  {startMins && startMins !== "" ? (
                    <>
                      {startMins.toString().split("").length == 2
                        ? startMins
                        : "0" + startMins}
                    </>
                  ) : (
                    "00"
                  )}
                </>
              )}
            </button>
            <div className="p-1 rounded-[12px] cursor-pointer bg-[color:var(--bg-secondary)]">
              <IconClock width={24}></IconClock>
              <Picker
                isOpen={startPickerOpen}
                setIsOpen={setStartPickerOpen}
                selHours={startHours}
                selMinutes={startMins}
                ampm={startAmpm}
                setSelHours={setStartHours}
                setSelMinutes={setStartMins}
                setAmpm={setStartAmpm}
                hourFormat={hourFormat}
                parent="start-clock"
              />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-[color:var(--bg-sidebar)] p-2 mt-4">
          <p className="font-medium mb-2 pl-2">End</p>
          <div
            className="flex rounded-2xl bg-[color:var(--bg-tertiary)] p-[6px] w-full justify-between relative cursor-pointer"
            id="end-clock"
            onClick={() => setEndPickerOpen(true)}
          >
            <button className="px-4 font-medium">
              {hourFormat == "12h" ? (
                <>{formatAMPM(toDate(endHours, endMins, endAmpm))}</>
              ) : (
                <>
                  {endHours && endHours !== "" ? (
                    <>
                      {endHours.toString().split("").length == 2
                        ? endHours
                        : "0" + endHours}
                    </>
                  ) : (
                    "00"
                  )}
                  :
                  {endMins && endMins !== "" ? (
                    <>
                      {endMins.toString().split("").length == 2
                        ? endMins
                        : "0" + endMins}
                    </>
                  ) : (
                    "00"
                  )}
                </>
              )}
            </button>
            <div className="p-1 rounded-[12px] cursor-pointer bg-[color:var(--bg-secondary)]">
              <IconClock width={24}></IconClock>
              <Picker
                isOpen={endPickerOpen}
                setIsOpen={setEndPickerOpen}
                selHours={endHours}
                selMinutes={endMins}
                ampm={endAmpm}
                setSelHours={setEndHours}
                setSelMinutes={setEndMins}
                setAmpm={setEndAmpm}
                hourFormat={hourFormat}
                parent="end-clock"
              />
            </div>
          </div>
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
          className="flex justify-evenly items-center rounded-2xl bg-[color:var(--button-primary)] px-6 py-3 ml-2"
          onClick={() => {
            submitData();
            if (step + 1 >= steps) {
              onClose();
              setHomeStatsRemount(Math.random());
            } else {
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

export default Time;
