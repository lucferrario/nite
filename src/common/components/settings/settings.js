import React, { useRef, useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabPanelUnstyled,
  TabUnstyled,
} from "@mui/base";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

import AlertContext from "../../contexts/alertcontext";

import Personal from "./personal";
import Appearance from "./appearance";
import About from "./about";

function Settings({ open, customClose }) {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const { setAlert, setAlertType } = useContext(AlertContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  const signout = () => {
    setAlert("You have been signed out");
    setAlertType("standard");
    signOut();
  };

  if (!open) return null;
  return (
    <div className="bg-[color:var(--bg-panel)] box-border w-[90vw] h-[80vh] overflow-y-scroll xl:overflow-hidden flex z-50 p-3 rounded-3xl sm:w-[80vw] sm:h-[75vh] md:w-[60vw] sm:max-h-[90vh] xl:w-[60vw] 2xl:w-[60vw] max-w-[1150px] dark:shadow-md">
      <div className="flex flex-col box-border w-full">
        <div className="absolute top-5 right-5 cursor-pointer">
          <IoClose size={24} onClick={customClose} className="" />
        </div>
        <div className="p-5 flex box-border items-center">
          <p className="text-xl font-semibold 2xl:text-2xl">Settings</p>
        </div>
        <div className="flex flex-col p-5 pt-0 xl:hidden">
          <button
            className="settings-btn"
            onClick={() => {
              setPersonalOpen(!personalOpen);
              setAppearanceOpen(false);
              setAboutOpen(false);
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <circle
                cx="12"
                cy="8"
                r="3.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"
              ></path>
            </svg>
            <p className="settings-btntxt">Personal</p>
          </button>
          {personalOpen ? <Personal /> : <></>}
          <button
            className="settings-btn"
            onClick={() => {
              setAppearanceOpen(!appearanceOpen);
              setPersonalOpen(false);
              setAboutOpen(false);
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                d="M5.53553 12.3787L12.5 5.41421L18.5858 11.5L11.6213 18.4645C10.4497 19.636 8.55025 19.636 7.37868 18.4645L5.53553 16.6213C4.36396 15.4497 4.36396 13.5503 5.53553 12.3787Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M13 3V11"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M18.8846 17.0769L19.5 15.6L20.1154 17.0769C20.2984 17.516 19.9757 18 19.5 18C19.0243 18 18.7016 17.516 18.8846 17.0769Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="settings-btntxt">Appearance</p>
          </button>
          {appearanceOpen ? <Appearance /> : <></>}
          <button
            className="settings-btn"
            onClick={() => {
              setAboutOpen(!aboutOpen);
              setPersonalOpen(false);
              setAppearanceOpen(false);
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9.25H13.75V5"
              ></path>
            </svg>
            <p className="settings-btntxt">About</p>
          </button>
          {aboutOpen ? <About /> : <></>}
          <button
            className="settings-btn mb-5 bg-red-50 shadow-md"
            onClick={signout}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                stroke="rgb(220 38 38)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.75 8.75L19.25 12L15.75 15.25"
              ></path>
              <path
                stroke="rgb(220 38 38)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H10.75"
              ></path>
              <path
                stroke="rgb(220 38 38)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"
              ></path>
            </svg>
            <p className="settings-btntxt text-[color:var(--error-color)]">
              Logout
            </p>
          </button>
        </div>
        <div className="hidden h-full xl:flex flex-col p-5">
          <TabsUnstyled defaultValue={0} className="is-active">
            <div className="flex box-border">
              <div className="w-1/4 box-border">
                <TabsListUnstyled className="flex flex-col justify-center">
                  <TabUnstyled value={0} className="settings-tab group">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mr-2"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="3.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></circle>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"
                      ></path>
                    </svg>
                    <p className="settings-txt">Personal</p>
                  </TabUnstyled>
                  <TabUnstyled value={1} className="settings-tab group">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mr-2"
                    >
                      <path
                        d="M5.53553 12.3787L12.5 5.41421L18.5858 11.5L11.6213 18.4645C10.4497 19.636 8.55025 19.636 7.37868 18.4645L5.53553 16.6213C4.36396 15.4497 4.36396 13.5503 5.53553 12.3787Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 3V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18.8846 17.0769L19.5 15.6L20.1154 17.0769C20.2984 17.516 19.9757 18 19.5 18C19.0243 18 18.7016 17.516 18.8846 17.0769Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="settings-txt">Appearance</p>
                  </TabUnstyled>
                  <TabUnstyled value={2} className="settings-tab group">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mr-2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9.25H13.75V5"
                      ></path>
                    </svg>
                    <p className="settings-txt">About</p>
                  </TabUnstyled>
                  <button className="settings-tab" onClick={signout}>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mr-2"
                    >
                      <path
                        stroke="rgb(220 38 38)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.75 8.75L19.25 12L15.75 15.25"
                      ></path>
                      <path
                        stroke="rgb(220 38 38)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H10.75"
                      ></path>
                      <path
                        stroke="rgb(220 38 38)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"
                      ></path>
                    </svg>
                    <p className="settings-txt !text-[color:var(--error-color)]">
                      Logout
                    </p>
                  </button>
                </TabsListUnstyled>
              </div>
              <div
                className="w-3/4 overflow-y-scroll box-border pl-10 relative"
                style={{ maxHeight: "calc(75vh - 150px)" }}
              >
                <TabPanelUnstyled value={0} className="w-full">
                  <Personal />
                </TabPanelUnstyled>
                <TabPanelUnstyled value={1} className="w-full">
                  <Appearance />
                </TabPanelUnstyled>
                <TabPanelUnstyled value={2} className="w-full">
                  <About />
                </TabPanelUnstyled>
              </div>
            </div>
          </TabsUnstyled>
        </div>
      </div>
    </div>
  );
}

export default Settings;
