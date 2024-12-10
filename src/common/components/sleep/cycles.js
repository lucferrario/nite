import React, { useEffect, useState, useContext } from "react";
import CycleCard from "./cyclecard";
import Tooltip from "../tooltip";
import alertContext from "../../contexts/alertcontext";
import IconClock from "../icons/iconclock";
import Picker from "../picker";
import axios from "axios";

function Cycles() {
  const { setAlert, setAlertType } = useContext(alertContext);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hourFormat, setHourFormat] = useState("12h");

  const [selectedTime, setSelectedTime] = useState();
  // selected hours by the user
  const [selHours, setSelHours] = useState();
  // selected minutes by the user
  const [selMinutes, setSelMinutes] = useState();
  // 3 responses on selected time
  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(new Date());
  const [time3, setTime3] = useState(new Date());
  // am/pm converter
  const [ampm, setAmpm] = useState();
  const [selectedCard, setSelectedCard] = useState(0);

  const [cycles, setCycles] = useState(90);

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

  function toDate(hours, minutes) {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
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

  function handleCustomCalc() {
    if (
      selHours <= 24 &&
      selHours >= 0 &&
      selMinutes <= 59 &&
      selMinutes >= 0
    ) {
      const date = new Date();
      date.setHours(selHours);
      date.setMinutes(selMinutes);
      //variable set to check if the user has selected a time
      setSelectedTime(date);

      const t1 = new Date(date);
      const t2 = new Date(date);
      const t3 = new Date(date);
      t1.setMinutes(date.getMinutes() - cycles * 6);
      t2.setMinutes(date.getMinutes() - cycles * 5);
      t3.setMinutes(date.getMinutes() - cycles * 4);
      setTime1(t1);
      setTime2(t2);
      setTime3(t3);
    } else {
      setAlert("Insert a valid time!");
      setAlertType("error");
      return;
    }
  }

  useEffect(() => {
    if (!selectedTime) {
      const date1 = new Date();
      const date2 = new Date();
      const date3 = new Date();

      date1.setMinutes(date1.getMinutes() + cycles * 6);
      date2.setMinutes(date2.getMinutes() + cycles * 5);
      date3.setMinutes(date3.getMinutes() + cycles * 4);

      setTime1(date1);
      setTime2(date2);
      setTime3(date3);
    }
  }, []);

  const selectedCardHandler = (card, start, end) => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    axios
      .post("/api/sleep", {
        start: start.getTime(),
        end: end.getTime(),
        forDate: date.toISOString().split("T")[0],
      })
      .then(() => {
        selectedCard === card ? setSelectedCard(0) : setSelectedCard(card);
      });
  };

  return (
    <div className="flex flex-col p-3 rounded-3xl bg-[color:var(--bg-panel)]">
      <div>
        <p className="font-semibold text-lg mb-4">
          At what time do you have to wake up?
        </p>
        <div className="relative flex flex-col">
          <div
            className="flex rounded-2xl bg-[color:var(--bg-secondary)] p-[6px] w-48 justify-between relative cursor-pointer"
            id="clock"
            onClick={() => setPickerOpen(!pickerOpen)}
          >
            <button className="px-4 font-medium">
              {hourFormat == "12h" ? (
                <>{formatAMPM(toDate(selHours, selMinutes))}</>
              ) : (
                <>
                  {selHours && selHours !== "" ? (
                    <>
                      {selHours.toString().split("").length == 2
                        ? selHours
                        : "0" + selHours}
                    </>
                  ) : (
                    "00"
                  )}
                  :
                  {selMinutes && selMinutes !== "" ? (
                    <>
                      {selMinutes.toString().split("").length == 2
                        ? selMinutes
                        : "0" + selMinutes}
                    </>
                  ) : (
                    "00"
                  )}
                </>
              )}
            </button>
            <div className="p-1 rounded-[12px] cursor-pointer bg-[color:var(--bg-tertiary)]">
              <IconClock width={24}></IconClock>
              <Picker
                isOpen={pickerOpen}
                setIsOpen={setPickerOpen}
                selHours={selHours}
                selMinutes={selMinutes}
                ampm={ampm}
                setSelHours={setSelHours}
                setSelMinutes={setSelMinutes}
                setAmpm={setAmpm}
                hourFormat={hourFormat}
              />
            </div>
          </div>
        </div>
        <button
          className="p-2 px-4 font-semibold mt-2 rounded-2xl bg-[color:var(--button-primary)] text-[color:var(--inverted-color)]"
          onClick={handleCustomCalc}
        >
          Calculate
        </button>
      </div>
      <div>
        {selectedTime ? (
          <p className="font-semibold text-lg mt-6 dark:text-white">
            Then, try to fall asleep at one of the following times:
          </p>
        ) : (
          <p className="font-semibold text-lg mt-6 dark:text-white">
            If you go to bed now,
            <br />
            try to wake up at one of the following times:
          </p>
        )}
        <div className="flex flex-col md:flex-row mt-4 lg:mt-2 gap-3">
          <div className="box-border w-full lg:mt-2">
            <div
              className={`${
                selectedCard === 1
                  ? "bg-[color:var(--bg-tertiary)]"
                  : "bg-[color:var(--bg-secondary)]"
              } box-border flex flex-col justify-center rounded-2xl p-2 px-5 w-full cursor-pointer transition-all duration-200 ease-linear`}
              onClick={() => {
                selectedCardHandler(
                  1,
                  selectedTime ? time1 : new Date(),
                  selectedTime ? selectedTime : time1
                );
              }}
            >
              <p className="font-medium text-lg">
                {time1
                  ? time1
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: hourFormat == "12h" ? true : false,
                      })
                      .toLowerCase()
                  : "00:00"}
              </p>
              <p className="text-xs text-[color:var(--secondary-color)]">
                6 sleep cycles
              </p>
            </div>
          </div>
          <div className="box-border w-full lg:mt-2">
            <div
              className={`${
                selectedCard === 2
                  ? "bg-[color:var(--bg-tertiary)]"
                  : "bg-[color:var(--bg-secondary)]"
              } box-border flex flex-col justify-center rounded-2xl p-2 px-5 w-full cursor-pointer transition-all duration-200 ease-linear`}
              onClick={() => {
                selectedCardHandler(
                  2,
                  selectedTime ? time2 : new Date(),
                  selectedTime ? selectedTime : time2
                );
              }}
            >
              <p className="font-medium text-lg">
                {time2
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: hourFormat == "12h" ? true : false,
                  })
                  .toLocaleLowerCase()}
              </p>
              <p className="text-xs text-[color:var(--secondary-color)]">
                Optimal sleep time
              </p>
            </div>
          </div>
          <div className="box-border w-full lg:mt-2">
            <div
              className={`${
                selectedCard === 3
                  ? "bg-[color:var(--bg-tertiary)]"
                  : "bg-[color:var(--bg-secondary)]"
              } box-border flex flex-col justify-center rounded-2xl p-2 px-5 w-full cursor-pointer transition-all duration-200 ease-linear`}
              onClick={() => {
                selectedCardHandler(
                  3,
                  selectedTime ? time3 : new Date(),
                  selectedTime ? selectedTime : time3
                );
              }}
            >
              <p className="font-medium text-lg">
                {time3
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: hourFormat == "12h" ? true : false,
                  })
                  .toLocaleLowerCase()}
              </p>
              <p className="text-xs text-[color:var(--secondary-color)]">
                4 sleep cycles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cycles;
