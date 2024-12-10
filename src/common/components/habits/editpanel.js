import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../../../styles/EditPanel.module.css";
import { BsCheck } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import HabitContext from "../../contexts/habit";
import AlertContext from "../../contexts/alertcontext";
import { handleClientScriptLoad } from "next/script";

function Editpanel() {
  const {
    editing,
    setEditing,
    editingId,
    editingText,
    setEditingText,
    editingStatus,
    setEditingStatus,
    editingNote,
    setEditingNote,
    editingRemount,
    setEditingRemount,
  } = useContext(HabitContext);
  const { setAlert, setAlertType } = useContext(AlertContext);

  const [checkStyle, setCheckStyle] = useState("");
  const [textStyle, setTextStyle] = useState("");

  const [apiTimer, setApiTimer] = useState(null);

  const [animate, setAnimate] = useState(styles.beforefadein);

  // change style on status change
  useEffect(() => {
    if (editingStatus) {
      setCheckStyle("bg-[color:var(--checkbox-selected)]");
      setTextStyle("line-through");
    } else {
      setCheckStyle("bg-[color:var(--checkbox-primary)]");
      setTextStyle("");
    }
  }, [editingStatus]);

  //fade in animation
  useEffect(() => {
    if (editing) {
      setAnimate(styles.fadein);
    }
  }, [editing]);

  const handleTextChange = (e) => {
    setEditingText(e.target.value);
    clearTimeout(apiTimer);
    setApiTimer(
      setTimeout(() => {
        axios.put("/api/habits", {
          id: editingId,
          text: e.target.value,
        });
      }, 1000)
    );
  };

  const handleNoteChange = (e) => {
    setEditingNote(e.target.value);
    clearTimeout(apiTimer);
    setApiTimer(
      setTimeout(() => {
        axios.put("/api/habits", {
          id: editingId,
          note: e.target.value,
        });
        setEditingRemount(Math.random());
      }, 500)
    );
  };

  const deleteHabit = async () => {
    setEditing(false);
    await axios
      .delete("/api/habits", { data: { id: editingId } })
      .then((res) => {
        if (res.status === 204) {
          setAlertType("standard");
          setAlert("Habit deleted successfully!");
        } else {
          setAlertType("error");
          setAlert("Something went wrong!");
        }
        setEditingRemount(Math.random());
      });
  };

  const onClose = () => {
    setAnimate(styles.fadeout);
    setTimeout(() => {
      setAnimate("");
      setEditing(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      //if click is not inside the modal, close it
      if (event.target.closest("#habitdetails") === null) {
        onClose();
      }
    };
    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  if (!editing) return null;
  return (
    <>
      <div
        className={`${animate} lg:mt-20 box-border w-full p-3 flex flex-col rounded-3xl z-[5] relative bg-[color:var(--bg-panel)]`}
        id="habitdetails"
      >
        <div className="w-full flex items-center relative box-border rounded-2xl p-2 group pr-8">
          <div
            className="absolute right-0 top-0 flex items-center justify-center h-full aspect-square p-1"
            onClick={onClose}
          >
            <div className="rounded-xl hover:bg-[color:var(--bg-secondary)] w-full h-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.25 6.75L6.75 17.25"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6.75 6.75L17.25 17.25"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className="relative flex justify-center items-center"
            onClick={() => {
              setEditingStatus(!editingStatus);
              axios.put("/api/habits", {
                id: editingId,
                status: !editingStatus,
              });
            }}
          >
            <input
              type="checkbox"
              className={`${checkStyle} mr-4 w-5 h-5 align-middle rounded-md appearance-none outline-none cursor-pointer`}
            />
            {editingStatus ? (
              <BsCheck
                size={20}
                className="text-[color:var(--inverted-color)] absolute top-0 left-0 cursor-pointer"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <input
              type="text"
              className={`${textStyle} text-sm transition-all duration-300 ease-in-out font-medium outline-none w-full bg-transparent`}
              maxLength="45"
              value={editingText}
              onChange={handleTextChange}
            />
          </div>
        </div>
        <div className="box-border">
          <textarea
            placeholder="Write a note..."
            maxLength="250"
            id=""
            rows="4"
            value={editingNote}
            onChange={handleNoteChange}
            className="w-full h-full outline-none resize-none border-none p-4 text-sm rounded-2xl mt-4 mb-1 dark:shadow-sm bg-[color:var(--bg-secondary)]"
          ></textarea>
          <button
            className="rounded-2xl bg-opacity-20 text-sm font-semibold px-4 py-[10px] w-full bg-[color:var(--error-bg)] text-[color:var(--error-color)]"
            onClick={deleteHabit}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Editpanel;
