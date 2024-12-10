import React, { useState, useEffect, useContext } from "react";
import { BsCheck } from "react-icons/bs";
import { MenuUnstyled, MenuItemUnstyled, PopperUnstyled } from "@mui/base";
import Icondots from "../icons/icondots";
import Iconnote from "../icons/iconnote";
import AlertContext from "../../contexts/alertcontext";
import HabitContext from "../../contexts/habit";
import axios from "axios";
import ConfirmDeletion from "./challenges/confirmDeletion";
import Modal from "../modal";

function SingleHabit({
  text,
  checked,
  id,
  note,
  size,
  setHabitsRemount,
  setChallengesRemount,
}) {
  const { setAlert, setAlertType } = useContext(AlertContext);
  const {
    editing,
    setEditing,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    editingStatus,
    setEditingStatus,
    editingNote,
    setEditingNote,
  } = useContext(HabitContext);

  const [currentText, setCurrentText] = useState(text);
  const [isChecked, setIsChecked] = useState(checked);
  const [checkStyle, setCheckStyle] = useState("");
  const [textStyle, setTextStyle] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  //realtime update
  useEffect(() => {
    if (editingId === id && editing) {
      setCurrentText(editingText);
      setIsChecked(editingStatus);
    }
  }, [editing, editingId, id, editingText, editingStatus]);

  //update styles on check
  useEffect(() => {
    if (isChecked) {
      setCheckStyle("bg-[color:var(--checkbox-selected)]");
      setTextStyle("line-through");
    } else {
      setCheckStyle("bg-[color:var(--checkbox-primary)]");
      setTextStyle("");
    }
  }, [isChecked]);

  //TODO: spostare questa funzione in lghabits e passare l'id della habit quando si clicca su delete
  const deleteHabit = async () => {
    axios.delete("/api/habits", { data: { id: id } }).then((res) => {
      if (res.status === 204) {
        setIsVisible(false);
        setHabitsRemount(Math.random());
        setAlert("Habit deleted successfully!");
        setAlertType("standard");
      } else {
        if (res.status === 200) {
          //ask for confirmation
          setConfirmationOpen(true);
        } else {
          setAlertType("error");
          setAlert("Something went wrong!");
        }
      }
    });
  };

  const toggleItems = () => {
    setIsChecked(!isChecked);
    axios
      .put("/api/habits", { id: id, text: currentText, status: !isChecked })
      .then(() => {
        setChallengesRemount(Math.random());
      });

    if (editing && editingId === id) {
      setEditingStatus(!isChecked);
    }
  };

  //   MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const close = () => {
    setAnchorEl(null);
  };
  //   MENU

  return (
    <div
      className={`w-full flex items-center relative box-border rounded-2xl p-4 py-3 h-11 bg-[color:var(--bg-habit)] group cursor-pointer transition-all duration-600 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
      }`}
    >
      <div
        className="relative flex justify-center items-center"
        onClick={() => {
          toggleItems();
        }}
      >
        <input
          type="checkbox"
          className={`${checkStyle} mr-4 w-5 h-5 align-middle rounded-md appearance-none outline-none cursor-pointer`}
        />
        {isChecked ? (
          <BsCheck
            size={20}
            className="absolute top-0 left-0 cursor-pointer text-[color:var(--inverted-color)]"
          />
        ) : (
          <></>
        )}
      </div>
      <div
        className={`w-full max-w-full ${
          note && size === "lg" ? "pr-[88px]" : "pr-5"
        }`}
      >
        <p
          className={`${textStyle} text-sm transition-all duration-300 ease-in-out font-medium text-ellipsis whitespace-nowrap overflow-hidden pr-4`}
          onClick={() => {
            setEditing(true);
            setEditingId(id);
            setEditingText(currentText);
            setEditingStatus(isChecked);
            setEditingNote(note ? note : "");
          }}
        >
          {currentText}
        </p>
      </div>
      <div className="absolute right-0 top-0 p-2 h-full items-center justify-center cursor-pointer opacity-0 flex invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out">
        {note && size === "lg" ? (
          <div
            className="flex justify-center items-center hover:bg-[color:var(--bg-hover)] rounded-lg aspect-square h-full transition-all duration-200 ease-in-out"
            onClick={() => {
              if (size === "lg") {
                setEditing(true);
                setEditingId(id);
                setEditingText(currentText);
                setEditingStatus(isChecked);
                setEditingNote(note ? note : "");
              } else {
                setAlertType("error");
                setAlert("You can only edit notes while in the habit section!");
              }
            }}
          >
            <Iconnote />
          </div>
        ) : null}
        {size !== "challenge" && (
          <div
            className="flex justify-center items-center hover:bg-[color:var(--bg-hover)]  rounded-lg aspect-square h-full transition-all duration-200 ease-in-out"
            onClick={handleButtonClick}
          >
            <Icondots />
          </div>
        )}
      </div>

      <Modal
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        allowClose={false}
      >
        <ConfirmDeletion
          setConfirmationOpen={setConfirmationOpen}
          confirmationOpen={confirmationOpen}
          id={id}
          setHabitsRemount={setHabitsRemount}
          setChallengesRemount={setChallengesRemount}
        />
      </Modal>

      <MenuUnstyled
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        className="z-20 rounded-[16px] p-1 bg-[color:var(--bg-panel)]"
      >
        <MenuItemUnstyled
          className="mb-1 box-border bg-[color:var(--bg-secondary)] py-[6px] px-3 rounded-xl cursor-pointer outline-none"
          onClick={(e) => {
            if (size === "lg") {
              setEditing(true);
              setEditingId(id);
              setEditingText(currentText);
              setEditingStatus(isChecked);
            } else {
              setAlertType("error");
              setAlert("You can only edit habits while in the habit section!");
            }
            close();
          }}
        >
          <p className="text-center text-sm">✍️ Edit</p>
        </MenuItemUnstyled>
        <MenuItemUnstyled
          className="box-border bg-[color:var(--error-bg)] py-[6px] px-3 rounded-xl cursor-pointer outline-none"
          onClick={(e) => {
            close();
            deleteHabit();
          }}
        >
          <p className="text-[color:var(--error-color)] text-center text-sm">
            🗑️ Delete
          </p>
        </MenuItemUnstyled>
      </MenuUnstyled>
    </div>
  );
}

export default SingleHabit;
