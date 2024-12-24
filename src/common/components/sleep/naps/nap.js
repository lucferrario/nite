import React, { useState, useEffect, useContext } from "react";
import Icondots from "../../icons/icondots";
import IconDelete from "../../icons/icondelete";
import { MenuUnstyled, MenuItemUnstyled, PopperUnstyled } from "@mui/base";
import Picker from "./picker";
import AlertContext from "../../../contexts/alertcontext";
import axios from "axios";
import styles from "../../../../styles/Nap.module.css";

function Nap({ id, created, duration, note, size, napRemount, setNapRemount }) {
  let date = new Date(created);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { setAlert, setAlertType } = useContext(AlertContext);

  const [formattedDuration, setFormattedDuration] = useState("min");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [newDuration, setNewDuration] = useState(duration);
  const [newNote, setNewNote] = useState(note);
  // const [customTime, setCustomTime] = useState(duration > 60 ? "h" : "min");
  const [customTime, setCustomTime] = useState("min");
  const [selectedSize, setSelectedSize] = useState(size);

  useEffect(() => {
    // if (duration < 60) {
    //   setFormattedDuration(`${duration} min`);
    // } else {
    //   if (duration % 60 === 0) {
    //     setFormattedDuration(`${duration / 60} h`);
    //   } else {
    //     setFormattedDuration(
    //       `${Math.floor(duration / 60)}h ${duration % 60}min`
    //     );
    //   }
    // }

    setFormattedDuration(duration + " min");
  }, [duration]);

  //   MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleButtonClick = (e) => {
    e.preventDefault();
    deleteNap();
    // if (isOpen) {
    //   setAnchorEl(null);
    // } else {
    //   setAnchorEl(e.currentTarget);
    // }
  };

  const deleteNap = () => {
    axios
      .delete(`/api/naps`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        setNapRemount(Math.random());
        setAlert("Nap deleted successfully");
        setAlertType("standard");
      })
      .catch((err) => {
        setAlert(err.message);
        setAlertType("error");
      });
  };

  //on click outside, close edit menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      //if click is inside nap, set size to small
      if (!event.target.closest("#nap")) {
        setSelectedSize("small");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/naps`, {
        id: id,
        minutes: Number(newDuration),
        note: newNote,
      })
      .then((res) => {
        setNapRemount(Math.random());
        setAlert("Nap edited successfully");
        setAlertType("standard");
        setSelectedSize("small");
      })
      .catch((err) => {
        setAlert(err.message);
        setAlertType("error");
      });
  };

  const close = () => {
    setAnchorEl(null);
  };
  //   MENU

  return (
    <div
      id="nap"
      className={`${
        styles.nap
      } w-full flex flex-col sm:grid gap-1 md:gap-5 items-center relative box-border rounded-2xl p-4 py-3 bg-[color:var(--bg-habit)] group ${
        selectedSize !== "large" && "cursor-pointer"
      } transition-all duration-600`}
      onClick={() => setSelectedSize(selectedSize === "large")}
    >
      <div className="absolute right-0 top-0 p-2 h-full items-center justify-center cursor-pointer opacity-100 xl:opacity-0 flex xl:invisible visible xl:group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out">
        {selectedSize === "small" ? (
          <div
            className="flex justify-center items-center bg-[color:var(--error-bg)] xl:hover:bg-[color:var(--error-bg)] rounded-lg px-1 h-full transition-all duration-200 ease-in-out text-[color:var(--error-color)]"
            onClick={handleButtonClick}
          >
            {/* <Icondots /> */}
            <IconDelete size={14} />
          </div>
        ) : (
          <div
            className="flex justify-center items-center bg-[color:var(--bg-hover)] xl:hover:bg-[color:var(--bg-hover)] rounded-xl h-full transition-all duration-200 ease-in-out"
            onClick={handleEdit}
          >
            <p className="px-3 text-sm font-medium">Save</p>
          </div>
        )}
      </div>

      <p className="">{`${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`}</p>
      {selectedSize === "small" ? (
        <p className="font-semibold">{formattedDuration}</p>
      ) : (
        <div id="napEdit" className="flex">
          <input
            type="number"
            value={newDuration > 60 ? newDuration / 60 : newDuration}
            onChange={(e) => {
              setNewDuration(e.target.value);
            }}
            className="w-10 text-center font-medium bg-transparent outline-none max-w-fit"
          />
          <button className="font-medium" onClick={() => setPickerOpen(true)}>
            {customTime}
          </button>
          {selectedSize === "large" && (
            <Picker
              isOpen={pickerOpen}
              setIsOpen={setPickerOpen}
              parent={"#napEdit"}
              setSelectedValue={setCustomTime}
              selectedValue={customTime}
            />
          )}
        </div>
      )}
      {selectedSize === "small" ? (
        <p
          className={`${
            selectedSize === "small"
              ? "text-ellipsis whitespace-nowrap overflow-hidden max-w-full"
              : ""
          } pr-6 xl:pr-2 group-hover:pr-6 transition-all duration-200 ease-in-out col-span-2 sm:col-span-1`}
        >
          {note}
        </p>
      ) : (
        <input
          type="text"
          className="w-full bg-transparent outline-none resize-none pr-4 group-hover:pr-14 break-words transition-all duration-200 ease-in-out col-span-2 sm:col-span-1"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          autoFocus={true}
        ></input>
      )}
    </div>
  );
}

export default Nap;
