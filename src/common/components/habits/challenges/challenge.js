import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import { MenuUnstyled, MenuItemUnstyled, PopperUnstyled } from "@mui/base";
import Icondots from "../../icons/icondots";
import axios from "axios";
import AlertContext from "../../../contexts/alertcontext";
import Iconflame from "../../icons/iconflame";
import ChallengeCompleted from "./challengecompleted";
import Modal from "../../modal";

function Challenge({
  id,
  name,
  icon,
  description,
  frequency,
  duration,
  progress,
  open,
  streak,
  habitsRemount,
  setHabitsRemount,
  challengesRemount,
  setChallengesRemount,
  editOpen,
  setEditOpen,
  editingId,
  setEditingId,
}) {
  const { setAlert, setAlertType } = useContext(AlertContext);
  const [completedOpen, setCompletedOpen] = useState(true);

  const deleteChallenge = async () => {
    await axios.delete("/api/challenges", { data: { id: id } }).then((res) => {
      if (res.status === 200) {
        setHabitsRemount(Math.random());
        setChallengesRemount(Math.random());
        setAlert("Challenge deleted successfully!");
        setAlertType("standard");
      } else {
        setAlertType("error");
        setAlert("Something went wrong!");
      }
    });
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

  useEffect(() => {
    if (progress === duration) {
      setCompletedOpen(true);
    } else {
      setCompletedOpen(false);
    }
  }, [progress, duration, streak]);

  return (
    <div
      id="challenge"
      className="relative overflow-hidden flex flex-col w-full bg-[color:var(--bg-secondary)] rounded-2xl p-3 group"
    >
      <div className="relative flex w-full items-center z-[5]">
        <div className="rounded-2xl w-11 h-11 flex justify-center items-center bg-[color:var(--bg-panel)] mr-3 shadow-sm">
          {icon ? icon : "🏋️‍♂️"}
        </div>
        <h1 className="font-medium text-ellipsis whitespace-nowrap overflow-hidden pr-2">
          {name}
        </h1>
        <div className="absolute -right-1 -top-2 p-1 h-full items-center justify-center cursor-pointer opacity-0 flex invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-in-out">
          <div
            className="flex justify-center items-center hover:bg-[color:var(--bg-hover)] rounded-lg aspect-square transition-all duration-200 ease-in-out"
            onClick={handleButtonClick}
          >
            <Icondots />
          </div>
        </div>
        <div className="absolute -right-1 -top-2 p-1 h-full items-center justify-center cursor-pointer opacity-100 flex visible group-hover:invisible group-hover:opacity-0 transition-all duration-200 ease-in-out">
          <div className="flex justify-center items-center hover:hidden rounded-lg aspect-square transition-all duration-200 ease-in-out">
            <p className="font-medium text-sm">{streak}</p>
            <Iconflame size={24} />
          </div>
        </div>
      </div>
      <div className="w-full -mt-2 z-[5]">
        <div className="w-full flex justify-end">
          <p className="right-0 text-sm font-medium mb-1">
            {progress}/{duration}
          </p>
        </div>
        <div className="rounded-full h-3 bg-[color:var(--bg-panel)]">
          <div
            className="rounded-full h-3 bg-[color:var(--active-color)] transition-all duration-500 ease-in-out"
            style={{ width: `${(progress / duration) * 100}%` }}
          ></div>
        </div>
      </div>

      {completedOpen &&
        Number(progress) === Number(duration) &&
        duration > 29 && (
          <Modal
            open={completedOpen}
            onClose={setResetOrDeleteOpen(true)}
            allowClose={true}
          >
            <ChallengeCompleted
              id={id}
              name={name}
              duration={duration}
              completedOpen={completedOpen}
              setCompletedOpen={setCompletedOpen}
              challengesRemount={challengesRemount}
              setChallengesRemount={setChallengesRemount}
              habitsRemount={habitsRemount}
              setHabitsRemount={setHabitsRemount}
            />
          </Modal>
        )}

      <MenuUnstyled
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        className="z-20 rounded-[16px] p-1 bg-[color:var(--bg-panel)]"
      >
        <MenuItemUnstyled
          className="mb-1 box-border bg-[color:var(--bg-secondary)] py-[6px] px-3 rounded-xl cursor-pointer outline-none"
          onClick={(e) => {
            window.scrollTo(0, 0);
            setEditingId(id);
            setEditOpen(true);
            close();
          }}
        >
          <p className="text-center text-sm">✍️ Edit</p>
        </MenuItemUnstyled>
        {open ? (
          <MenuItemUnstyled
            className="mb-1 box-border bg-[color:var(--bg-secondary)] py-[6px] px-3 rounded-xl cursor-pointer outline-none"
            onClick={(e) => {
              if (open) {
                navigator
                  .share({
                    title: "nite",
                    text: `Join my challenge ${name} on nite!`,
                    url: `${process.env.NEXTAUTH_URL}/challenge/${
                      id ? id : ""
                    }`,
                  })
                  .then(() => {
                    setAlert("Shared link");
                    setAlertType("standard");
                  })
                  .catch(() => {
                    setAlert("Failed to share link");
                    setAlertType("error");
                  });
              } else {
                setAlert("Turn your challenge public to share it!");
                setAlertType("error");
              }

              close();
            }}
          >
            <p className="text-center text-sm">🌐 Share</p>
          </MenuItemUnstyled>
        ) : (
          <></>
        )}
        <MenuItemUnstyled
          className="box-border bg-[color:var(--error-bg)] py-[6px] px-3 rounded-xl cursor-pointer outline-none"
          onClick={(e) => {
            close();
            deleteChallenge();
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

export default Challenge;
