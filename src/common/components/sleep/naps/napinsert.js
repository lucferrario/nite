import React, { useState, useEffect, useContext } from "react";
import NapCard from "./napcard";
import NapNote from "./napnote";
import Picker from "./picker";
import axios from "axios";
import AlertContext from "../../../contexts/alertcontext";

function NapInsert() {
  const [note, setNote] = useState("");
  const [duration, setDuration] = useState(0);
  const [custom, setCustom] = useState(15);
  const [customActive, setCustomActive] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [customTime, setCustomTime] = useState("min");
  const { setAlert, setAlertType } = useContext(AlertContext);
  const [selected, setSelected] = useState(0);

  const handleClick = () => {
    if (duration > 0) {
      setNote("");
      let minutes = duration
        ? duration
        : customTime === "min"
        ? custom
        : custom * 60;

      axios
        .post("/api/naps", { minutes: Number(minutes), note: note })
        .then((res) => {
          setAlertType("standard");
          setAlert("You're good to go!");
          setDuration(0);
          setSelected(0);
        })
        .catch((err) => {
          setAlert("Aren't you sleeping too much?");
          setAlertType("error");
          setDuration(0);
          setSelected(0);
        });
    } else {
      setAlert("Oops! You forgot to set the duration");
      setAlertType("error");
    }
  };

  return (
    <div className="p-3 rounded-3xl bg-[color:var(--bg-panel)] w-full flex flex-col gap-3">
      <div className="w-full flex flex-col md:flex-row gap-3">
        <div
          className="md:w-1/2 grid grid-cols-2 gap-2"
          style={{ gridTemplateRows: "1fr 1.25fr 1fr" }}
        >
          <NapCard
            size={"small"}
            duration={10}
            setDuration={setDuration}
            selected={selected}
            setSelected={setSelected}
          />
          <NapCard
            size={"small"}
            duration={30}
            setDuration={setDuration}
            selected={selected}
            setSelected={setSelected}
          />
          <NapCard
            size={"big"}
            duration={20}
            setDuration={setDuration}
            selected={selected}
            setSelected={setSelected}
          />
          <div
            id="napInsert"
            className={`relative rounded-2xl col-span-2 p-[10px] flex justify-center items-center cursor-pointer transition-all duration-200 ease-linear ${
              selected === 100
                ? `bg-[color:var(--bg-tertiary)]`
                : `bg-[color:var(--bg-secondary)]`
            }`}
            onClick={() => {
              setCustomActive(true);
              setSelected(100);
            }}
          >
            {/* INPUT ACTIVE ON CLICK */}
            {customActive ? (
              <>
                <input
                  type="number"
                  autoFocus={true}
                  value={custom}
                  onChange={(e) => {
                    if (e.target.value.length < 4) {
                      setCustom(e.target.value);
                      setDuration(e.target.value);
                    } else {
                      setCustom(e.target.value.slice(0, 3));
                      setDuration(e.target.value.slice(0, 3));
                    }
                  }}
                  className="w-10 text-center font-medium bg-transparent outline-none"
                />
                {/* <Picker
                  isOpen={pickerOpen}
                  setIsOpen={setPickerOpen}
                  parent={"#napInsert"}
                  setSelectedValue={setCustomTime}
                  selectedValue={customTime}
                /> */}
                <div onClick={() => setPickerOpen(!pickerOpen)}>
                  <p>{customTime}</p>
                </div>
              </>
            ) : (
              <p className="text-center font-medium">Custom value</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 min-h-[140px]">
          <NapNote note={note} setNote={setNote} />
        </div>
      </div>
      {duration !== 0 ? (
        <button
          className="rounded-2xl bg-[color:var(--button-primary)] py-[10px] px-4"
          onClick={handleClick}
        >
          <p className="text-[color:var(--inverted-color)] font-medium">
            Insert
          </p>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NapInsert;
