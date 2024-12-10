import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import styles from "../../../../styles/Modal.module.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import IconShare from "../../icons/iconshare";
import html2canvas from "html2canvas";
import AlertContext from "../../../contexts/alertcontext";
import { Skeleton } from "@mui/material";
import ResetOrDelete from "./resetordelete";
import Modal from "../../modal";

function ChallengeCompleted({
  id,
  name,
  duration,
  completedOpen,
  setCompletedOpen,
  habitsRemount,
  setHabitsRemount,
  challengesRemount,
  setChallengesRemount,
}) {
  const { data: session, status } = useSession();
  const { setAlert, setAlertType } = useContext(AlertContext);

  const [imageStyle, setImageStyle] = useState("block");
  const [completedChallengeImage, setCompletedChallengeImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [resetOrDeleteOpen, setResetOrDeleteOpen] = useState(false);

  const titles = [
    "Challenge Alchemist",
    "Dream Enchanter",
    "Challenge Mystic",
    "Habit Wizard",
    "Dream Magician",
    "Dream Weaver",
    "Habit Sorcerer",
    "Sleep Sorcerer",
    "Goal Guardian",
    "Achievement Architect",
    "Sleep Enigma",
    "Habit Whisperer",
    "Dream Conjurer",
    "Challenge Maestro",
    "Sleep Sentinel",
    "Habit Oracle",
    "Dream Navigator",
    "Achievement Alchemist",
    "Challenge Visionary",
    "Habit Enigma",
  ];

  useEffect(() => {
    if (completedOpen) {
      setCompletedChallengeImage(
        `/images/badge${Math.round(Math.random() * (4 - 1) + 1)}.png`
      );
    }
  }, [completedOpen]);

  const onClose = () => {
    setImageStyle("hidden");
    setCompletedOpen(false);
  };

  const resetChallenge = async () => {
    try {
      await axios.put("/api/challenges", {
        id: id,
        restart: true,
      });
      setAlert("Challenge reset successfully");
      setAlertType("standard");
      setHabitsRemount(Math.random());
      setChallengesRemount(Math.random());
      onClose();
    } catch (error) {
      setAlert("Error resetting challenge");
      setAlertType("error");
    }
  };

  const deleteChallenge = async () => {
    try {
      await axios.delete("/api/challenges", {
        data: {
          id: id,
        },
      });
      setAlert("Challenge deleted successfully");
      setAlertType("standard");
      setHabitsRemount(Math.random());
      setChallengesRemount(Math.random());
      onClose();
    } catch (error) {
      setAlert("Error deleting challenge");
      setAlertType("error");
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const shareBadge = async () => {
    const modalDiv = document.getElementById("modal");

    // Use html2canvas to capture the div as an image
    const canvas = await html2canvas(modalDiv);

    // Convert the canvas to a data URL
    const imageData = canvas.toDataURL("image/png");

    // Check if the Web Share API is available in the browser
    if (navigator.share) {
      try {
        // Share the image as text using the Web Share API
        await navigator.share({
          text: "Check out my badge!",
          files: [await dataURLtoBlob(imageData)],
        });
      } catch (error) {
        console.error(error);
        setAlert("Error sharing badge");
        setAlertType("error");
      }
    } else {
      setAlert("Oh no! Web Share API is not supported in your browser");
      setAlertType("error");
    }
  };

  // Helper function to convert data URL to Blob
  const dataURLtoBlob = async (dataURL) => {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    return new File([blob], "badge.png", { type: "image/png" });
  };

  if (!completedOpen) return null;
  return (
    <>
      <div
        className={`badge p-5 w-[90vw] max-h-[80vh] z-40 rounded-3xl sm:w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] max-w-[1150px] bg-[color:var(--bg-panel)] dark:shadow-md`}
      >
        {resetOrDeleteOpen ? (
          <ResetOrDelete
            resetOrDeleteOpen={resetOrDeleteOpen}
            setResetOrDeleteOpen={setResetOrDeleteOpen}
            resetChallenge={resetChallenge}
            deleteChallenge={deleteChallenge}
          />
        ) : (
          <>
            <div className="rounded-3xl aspect-square">
              {loading && (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  style={{
                    borderRadius: 15,
                    height: "100%",
                    backgroundColor: "var(--bg-habit)",
                    opacity: 0.7,
                    gridColumnEnd: "span 2",
                  }}
                />
              )}
              <Image
                src={completedChallengeImage}
                width={800}
                height={800}
                alt="Badge"
                onLoad={() => setLoading(false)}
                className={`rounded-3xl ${
                  loading ? "hidden" : "block"
                } aspect-square ${imageStyle}`}
              />
            </div>
            <h1 className="font-semibold text-3xl mt-4">
              {session.user.name ? session.user.name : "user"}
            </h1>
            <p className="font-medium text-[color:var(--secondary-color)]">
              {titles[Math.round(Math.random() * (20 - 0) + 0)]}
            </p>
            <div className="flex flex-row gap-4 mt-16 w-fit py-1 px-2 bg-[color:var(--bg-secondary)] rounded-lg">
              <p className="text-xs font-medium">@NITEINC</p>
              <p className="text-xs font-medium">
                {new Date().toLocaleDateString("en-EN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            {/* <div
              className="absolute right-5 bottom-6 cursor-pointer"
              onClick={shareBadge}
            >
              <IconShare />
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default ChallengeCompleted;
