import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import Picker from "./picker";
import axios from "axios";
import ChallengeHabit from "./challengehabit";
import HabitInsert from "../habitinsert";
import AlertContext from "../../../contexts/alertcontext";
import IconLock from "../../icons/iconlock";
import IconUnlock from "../../icons/iconunlock";
import Emojipicker from "../../emojipicker";
import { IoClose } from "react-icons/io5";
import styles from "../../../../styles/Modal.module.css";
import Skeleton from "@mui/material/Skeleton";
function ChallengeInsert({
  isOpen,
  setIsOpen,
  idChallenge,
  habitsRemount,
  setHabitsRemount,
  challengesRemount,
  setChallengesRemount,
  customClose,
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [challengeName, setChallengeName] = useState("");
  const [challengeDuration, setChallengeDuration] = useState(0);
  const [challengeDescription, setChallengeDescription] = useState("");
  const [habits, setHabits] = useState([]);
  const [allhabits, setAllhabits] = useState([]);
  const { alert, setAlert, alertType, setAlertType } = useContext(AlertContext);
  const [challengeId, setChallengeId] = useState(null);
  const [emoji, setEmoji] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //get all habits, set all checks to false -> check now corresponds to selected or not
  const checkHabits = () => {
    axios.get("/api/habits").then((response) => {
      let uncheckedhabits = response.data.data.map((habit) => ({
        ...habit,
        checked: false,
      }));
      setAllhabits(uncheckedhabits);
    });
  };

  useEffect(() => {
    checkHabits();
  }, []);

  useEffect(() => {
    checkHabits();
  }, [habitsRemount, challengesRemount]);

  useEffect(() => {
    setIsLoading(true);
    if (idChallenge) {
      axios.get(`/api/challenges?id=${idChallenge}`).then((res) => {
        setChallengeName(res.data.data.name);
        setChallengeDuration(res.data.data.duration);
        setChallengeDescription(res.data.data.description);
        setEmoji({ emoji: res.data.data.icon });
        setIsPublic(res.data.data.open);

        let ids = res.data.data.Habits.map((habit) => habit.id);
        let filteredHabits = allhabits.map((habit) => {
          if (ids.includes(habit.id)) {
            return { ...habit, checked: true };
          } else {
            return { ...habit, checked: false };
          }
        });
        setHabits(filteredHabits);
        setIsLoading(false);
      });
    }
  }, [allhabits]);

  const onSubmit = () => {
    if (!challengeName) {
      setAlertType("error");
      setAlert("Please insert a name for the challenge");
      return false;
    }
    if (challengeDuration === 0) {
      setAlertType("error");
      setAlert("Please insert a valid duration for the challenge");
      return false;
    }
    if (habits.filter((habit) => habit.checked).length === 0) {
      setAlertType("error");
      setAlert("Please select at least one habit!");
      return false;
    }
    if (habits.filter((habit) => habit.checked).length > 8) {
      setAlertType("error");
      setAlert("Aren't you a little bit too ambitious?");
      return false;
    }

    const challenge = {
      id: idChallenge,
      name: challengeName,
      duration: challengeDuration,
      description: challengeDescription,
      habits: habits.filter((habit) => habit.checked),
      icon: emoji.emoji,
      open: isPublic,
    };
    axios.put("/api/challenges", challenge).then((res) => {
      setHabitsRemount(Math.random());
      setChallengesRemount(Math.random());
      onClose();
    });
  };

  const onClose = () => {
    customClose();
  };

  return (
    <div
      className={`p-10 bg-[color:var(--bg-panel)] w-[90vw] md:w-[50vw] h-[80vh] xl:min-h-max xl:h-[55vh] rounded-3xl flex flex-col overflow-y-auto`}
    >
      <IoClose
        size={20}
        onClick={onClose}
        className="absolute right-4 top-4 cursor-pointer"
      />
      <div>
        <h1 className="mb-5 text-xl font-semibold 2xl:text-2xl">
          Edit challenge
        </h1>
      </div>
      <div className="w-full h-full flex flex-col xl:flex-row">
        <div className="w-full h-full xl:pr-5">
          <div>
            <p className="font-medium mb-2 ml-2">Name</p>
            <input
              type="text"
              className="bg-[color:var(--bg-secondary)] w-full text-sm font-medium outline-none focus:outline-none p-3 px-5 rounded-2xl"
              placeholder="Insert name..."
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
            />
          </div>
          <div className="mt-5 flex flex-col md:flex-row gap-5">
            <div>
              <p className="font-medium mb-2 ml-2">Duration</p>
              <div
                id="challengepickerbutton"
                onClick={() => setPickerOpen(!pickerOpen)}
                className="flex rounded-2xl bg-[color:var(--bg-secondary)] max-w-fit p-3 px-5 justify-between relative cursor-pointer box-border transition-all duration-200 ease-in-out"
              >
                <p className="text-sm text-[color:var(--secondary-color)]">
                  Duration:
                </p>
                <p className="font-medium text-sm mx-2 text-[color:var(--secondary-color)] min-w-fit">
                  {challengeDuration}{" "}
                  {challengeDuration !== 1 ? " days" : " day"}
                </p>
                <Picker
                  isOpen={pickerOpen}
                  setIsOpen={setPickerOpen}
                  selectedValue={challengeDuration}
                  setSelectedValue={setChallengeDuration}
                  parent={"challengepickerbutton"}
                />
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Icon</p>
              <button
                id="iconpickerbutton"
                className="relative h-11 w-11 rounded-2xl bg-[color:var(--bg-secondary)] flex justify-center items-center"
                onClick={() => {
                  setEmojiOpen(!emojiOpen);
                }}
              >
                <p className="font-medium text-center">
                  {emoji ? emoji.emoji : ":)"}
                </p>
              </button>
              <Emojipicker
                emojiOpen={emojiOpen}
                setEmojiOpen={setEmojiOpen}
                emoji={emoji}
                setEmoji={setEmoji}
                parent={"#iconpickerbutton"}
              />
            </div>
            <div>
              <p className="font-medium mb-2">Visibility</p>
              <button
                className="flex rounded-2xl bg-[color:var(--bg-secondary)] p-3 px-5 justify-center items-center gap-2 transition-all duration-200 ease-in-out"
                onClick={() => setIsPublic(!isPublic)}
              >
                {isPublic ? (
                  <>
                    <IconUnlock size={20} />
                    <p className="font-medium text-sm hidden lg:block">
                      Public
                    </p>
                  </>
                ) : (
                  <>
                    <IconLock size={20} />
                    <p className="font-medium text-sm hidden lg:block">
                      Private
                    </p>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-medium mb-2 ml-2">Description</p>
            <textarea
              placeholder="Write a note..."
              maxLength="250"
              id=""
              rows="4"
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
              className="w-full h-full outline-none resize-none border-none p-4 text-sm rounded-2xl mb-1 dark:shadow-sm bg-[color:var(--bg-secondary)]"
            ></textarea>
          </div>
          <button
            className="hidden xl:block w-full rounded-2xl bg-[color:var(--button-primary)] py-[10px] text-[color:var(--inverted-color)] mt-3"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
        <div className="w-full h-full">
          <p className="font-medium ml-2 mb-2 mt-4 xl:mt-0">Add Habits</p>
          <div className="relative bg-[color:var(--bg-secondary)] rounded-3xl gap-2 flex flex-col p-3 max-h-[370px] overflow-y-scroll">
            <HabitInsert
              enabled={habits.length < 8 ? true : false}
              remount={habitsRemount}
              setRemount={setHabitsRemount}
            />
            {habits.length > 0 ? (
              <>
                {habits.map((habit) => {
                  return (
                    <ChallengeHabit
                      key={habit.id}
                      id={habit.id}
                      text={habit.text}
                      habits={habits}
                      setHabits={setHabits}
                      checked={habit.checked}
                    />
                  );
                })}
              </>
            ) : (
              <Skeleton
                variant="rounded"
                height={44}
                animation="wave"
                style={{
                  borderRadius: 16,
                  backgroundColor: "var(--bg-habit)",
                  opacity: 0.7,
                }}
              >
                {checkHabits()}
              </Skeleton>
            )}
          </div>
          <button
            className="block xl:hidden w-full rounded-2xl bg-[color:var(--button-primary)] py-[10px] text-[color:var(--inverted-color)] mt-5 mb-10"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChallengeInsert;
