import React, { useState } from "react";
import Icondashboard from "../icons/icondashboard";
import Iconhome from "../icons/iconhome";
import Iconsleep from "../icons/iconsleep";
import Iconhabits from "../icons/iconhabits";
import Tooltip from "../tooltip";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import IconJournal from "../icons/journal";

function CollapsedSidebar({ settingsOpen, setSettingsOpen }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const devWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const [iconSize, setIconSize] = useState(devWidth > 1023 ? 16 : 20);

  return (
    <div className="hidden relative h-full w-full min-w-20 bg-white box-border xl:flex flex-row rounded-3xl p-0 items-center mr-4 xl:flex-col xl:w-20 xl:py-4 xl:mb-0 dark:bg-neutral-800 z-[5]">
      <div className="p-4 box-border items-center justify-center pr-0 xl:p-0 relative flex rounded-2xl">
        <Tooltip title={"Settings"} placement={"right"}>
          {session.user.image ? (
            <div className="rounded-[20px] bg-cover" id="profile-pic">
              <img
                src={session.user.image}
                alt="profile picture"
                className="rounded-2xl aspect-square max-w-[48px]"
                onClick={() => {
                  setSettingsOpen(true);
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => {
                setSettingsOpen(true);
              }}
            >
              <div className="rounded-2xl p-4 mr-4 bg-cover" id="profile-pic">
                <p className="text-xl font-semibold cursor-default">
                  {session.user.name && session.user.name.split(" ").length > 1
                    ? session.user.name.split(" ")[0].charAt(0) +
                      session.user.name.split(" ")[1].charAt(0)
                    : session.user.name.charAt(0)}
                </p>
              </div>
            </button>
          )}
        </Tooltip>
      </div>
      <div className="p-4 flex flex-row justify-center xl:flex-col">
        <div className="flex flex-row justify-center xl:flex-col">
          <Tooltip title={"Home"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/home", undefined, { shallow: true });
              }}
              className={`tab-item group p-4 xl:mb-2 ${
                router.pathname === "/home" && "tab-active"
              }`}
            >
              <Iconhome
                size={iconSize}
                className="collapsedtab-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Home 🏡
              </span>
            </button>
          </Tooltip>
          <Tooltip title={"Sleep"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/sleep", undefined, { shallow: true });
              }}
              className={`tab-item group p-4 xl:mb-2 ${
                router.pathname === "/sleep" && "tab-active"
              }`}
            >
              <Iconsleep
                size={iconSize}
                className="collapsedtab-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Sleep 🌒
              </span>
            </button>
          </Tooltip>
          <Tooltip title={"Habits"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/habits", undefined, { shallow: true });
              }}
              className={`tab-item group p-4 xl:mb-2 ${
                router.pathname === "/habits" && "tab-active"
              }`}
            >
              <Iconhabits
                size={iconSize}
                className="collapsedtab-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Habits ✅
              </span>
            </button>
          </Tooltip>
          <Tooltip title={"Journal"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/journal", undefined, { shallow: true });
              }}
              className={`tab-item group p-4 xl:mb-2 ${
                router.pathname === "/journal" && "tab-active"
              }`}
            >
              <IconJournal
                size={iconSize}
                className="collapsedtab-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Journal 📝
              </span>
            </button>
          </Tooltip>
          <Tooltip title={"Analytics"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/analytics", undefined, { shallow: true });
              }}
              className={`tab-item group p-4 xl:mb-2 ${
                router.pathname === "/analytics" && "tab-active"
              }`}
            >
              <Icondashboard
                size={iconSize}
                className="collapsedtab-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Dashboard 📊
              </span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default CollapsedSidebar;
