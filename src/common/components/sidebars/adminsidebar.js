import React, { useState, useEffect, useContext } from "react";
import Icondashboard from "../icons/icondashboard";
import Iconhome from "../icons/iconhome";
import Iconsleep from "../icons/iconsleep";
import Iconhabits from "../icons/iconhabits";
import Icondailyhabit from "../icons/icondailyhabit";
import Iconpermissions from "../icons/iconpermissions";
import { HiOutlineCog } from "react-icons/hi";
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabPanelUnstyled,
  TabUnstyled,
} from "@mui/base";
// import AlertContext from "../../contexts/AlertContext";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import AlertContext from "../../contexts/alertcontext";

function AdminSidebar({ settingsOpen, setSettingsOpen }) {
  const { alertText, setAlert, setAlertType } = useContext(AlertContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [icon, setIcon] = useState("");

  return (
    <div
      className="hidden h-full w-full bg-white box-border flex-col rounded-3xl p-5 mr-5
      xl:flex xl:w-3/12 dark:bg-neutral-800 justify-between z-[5]"
    >
      <div className="flex flex-col justify-center ">
        <TabsListUnstyled className="flex flex-col justify-center">
          <TabUnstyled value={0} className="tab-item group p-3 px-6">
            <Icondashboard
              size={16}
              className="tab-icon group-hover:text-hovertxt dark:group-hover:text-neutral-100"
            />
            <p className="tab-text group-hover:text-hovertxt dark:group-hover:text-neutral-100">
              Users
            </p>
          </TabUnstyled>
          <TabUnstyled value={2} className="tab-item group p-3 px-6">
            <Iconsleep
              size={16}
              className="tab-icon group-hover:text-hovertxt dark:group-hover:text-neutral-100"
            />
            <p className="tab-text group-hover:text-hovertxt dark:group-hover:text-neutral-100">
              Sleep
            </p>
          </TabUnstyled>
          <TabUnstyled value={3} className="tab-item group p-3 px-6">
            <Iconhabits
              size={16}
              className="tab-icon group-hover:text-hovertxt dark:group-hover:text-neutral-100"
            />
            <p className="tab-text group-hover:text-hovertxt dark:group-hover:text-neutral-100">
              Habits
            </p>
          </TabUnstyled>
          <TabUnstyled value={4} className="tab-item group p-3 px-6">
            <Icondailyhabit
              size={16}
              className="tab-icon group-hover:text-hovertxt dark:group-hover:text-neutral-100"
            />
            <p className="tab-text group-hover:text-hovertxt dark:group-hover:text-neutral-100">
              Daily Habit
            </p>
          </TabUnstyled>
          <TabUnstyled value={1} className="tab-item group p-3 px-6">
            <Iconpermissions
              size={16}
              className="tab-icon group-hover:text-hovertxt dark:group-hover:text-neutral-100"
            />
            <p className="tab-text group-hover:text-hovertxt dark:group-hover:text-neutral-100">
              Permissions
            </p>
          </TabUnstyled>
        </TabsListUnstyled>
      </div>
      <div
        className="rounded-[20px] bg-[#f5f7fa] pb-3 dark:bg-neutral-700"
        id="profile-container"
      >
        <div className="p-3 flex box-border items-center">
          {session.user.image ? (
            <div className="rounded-2xl mr-5 bg-cover" id="profile-pic">
              <img
                src={session.user.image}
                alt="profile picture"
                width={48}
                height={48}
                className="rounded-2xl"
              />
            </div>
          ) : (
            <div className="rounded-2xl p-4 mr-5 bg-cover" id="profile-pic">
              <p className="text-2xl font-semibold cursor-default">
                {session.user.name && session.user.name.split(" ").length > 1
                  ? session.user.name.split(" ")[0].charAt(0) +
                    session.user.name.split(" ")[1].charAt(0)
                  : session.user.name.charAt(0)}
              </p>
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold dark:text-white">
              {status === "authenticated" ? session.user.name : "Guest"}
            </h3>
          </div>
        </div>
        <div className="flex px-3 box-border" id="profile-menu">
          <button
            className="flex items-center rounded-xl py-1 px-3 group bg-white dark:bg-neutral-800 z-[5] shadow-sm"
            onClick={() => {
              setSettingsOpen(true);
            }}
          >
            <HiOutlineCog
              className="mr-2 text-xs text-gray-500 dark:text-neutral-300"
              id="settings-icon"
            />
            <p
              className="text-gray-500 dark:text-neutral-300 text-xs"
              id="settings-text"
            >
              Settings
            </p>
          </button>
          <button
            className="flex items-center rounded-xl py-[6px] px-3 group ml-2 bg-white dark:bg-neutral-800 z-[5] shadow-sm"
            onClick={() => {
              setAlert("You have been signed out");
              setAlertType("standard");
              signOut();
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              className="mr-2 group-hover:text-red-500 transition-all duration-200 ease-in-out"
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
            <p
              className="hover:text-red-600 text-red-600 text-xs"
              id="settings-text"
            >
              Logout
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;