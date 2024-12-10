import React, { useContext } from "react";
import IconCopy from "../../icons/iconcopy";
import Tip from "../../tooltip";
import { IoClose } from "react-icons/io5";
import AlertContext from "../../../contexts/alertcontext";

function ChallengeCreated({ challengeId, challengeName, open, onClose }) {
  const { setAlert, setAlertType } = useContext(AlertContext);

  if (!open) return null;
  return (
    <div className="p-10 bg-[color:var(--bg-panel)] max-w-[90vw] rounded-3xl flex flex-col overflow-y-scroll">
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        <IoClose
          size={20}
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <p className="font-semibold text-xl text-center">You are all set!</p>
        <div className="flex justify-center items-center gap-3 max-w-[90%]">
          <div className="rounded-2xl bg-[color:var(--bg-color)] px-4 py-2 shadow-custom max-w-full">
            <Tip title={"Copy to clipboard"} placement={"bottom"}>
              <button
                className="flex gap-2 justify-center items-center max-w-full"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXTAUTH_URL}/challenge/${
                      challengeId ? challengeId : ""
                    }`
                  );
                  setAlert("Copied link to clipboard");
                  serAlertType("standard");
                }}
              >
                <p className="text-sm font-semibold text-[color:var(--tertiary-color)] text-ellipsis whitespace-nowrap overflow-hidden max-w-full ">
                  {process.env.NEXTAUTH_URL}/challenge/
                  {challengeId ? challengeId : ""}
                </p>
                <p>
                  <IconCopy />
                </p>
              </button>
            </Tip>
          </div>

          <Tip title={"Share link"} placement={"bottom"}>
            <button
              onClick={() => {
                if (open) {
                  navigator
                    .share({
                      title: "nite",
                      text: `Join my challenge ${challengeName} on nite!`,
                      url: `${process.env.NEXTAUTH_URL}/challenge/${
                        challengeId ? challengeId : ""
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
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14.25L12 5"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.75 8.25L12 4.75L15.25 8.25"
                ></path>
              </svg>
            </button>
          </Tip>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCreated;
