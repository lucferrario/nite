import React, { useState } from "react";
import Icondashboard from "../icons/icondashboard";
import Iconhome from "../icons/iconhome";
import Iconsleep from "../icons/iconsleep";
import Iconhabits from "../icons/iconhabits";
import IconJournal from "../icons/journal";
import Tooltip from "../tooltip";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function MobileNav({ settingsOpen, setSettingsOpen }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const devWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const [iconSize, setIconSize] = useState(devWidth > 1023 ? 16 : 20);

  return (
    <div
      id="mobilenav"
      className="fixed flex bottom-5 right-5 left-5 min-w-20 bg-white box-border rounded-3xl p-0 items-center justify-between dark:bg-neutral-800 z-10 xl:hidden"
    >
      <div className="p-4 flex flex-row justify-between w-full xl:flex-col">
        <div className="flex flex-row justify-between w-full xl:flex-col">
          <Tooltip title={"Home"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/home", undefined, { shallow: true });
              }}
              className={`tab-item group p-[16px] xl:mb-2 aspect-square ${
                router.pathname === "/home" && "tab-active"
              }`}
            >
              <Iconhome
                size={iconSize}
                className="MobileNav-icon group-hover:text-black dark:group-hover:text-neutral-100"
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
              className={`tab-item group p-[16px] xl:mb-2 aspect-square ${
                router.pathname === "/sleep" && "tab-active"
              }`}
            >
              <Iconsleep
                size={iconSize}
                className="MobileNav-icon group-hover:text-black dark:group-hover:text-neutral-100"
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
              className={`tab-item group p-[16px] xl:mb-2 aspect-square ${
                router.pathname === "/habits" && "tab-active"
              }`}
            >
              <Iconhabits
                size={iconSize}
                className="MobileNav-icon group-hover:text-black dark:group-hover:text-neutral-100"
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
              className={`tab-item group p-[16px] xl:mb-2 aspect-square ${
                router.pathname === "/journal" && "tab-active"
              }`}
            >
              <IconJournal
                size={iconSize}
                className="MobileNav-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Journal 📝
              </span>
            </button>
          </Tooltip>
          {/* <Tooltip title={"Dashboard"} placement={"right"}>
            <button
              onClick={() => {
                router.push("/analytics", undefined, { shallow: true });
              }}
              className={`tab-item group p-[16px] xl:mb-2 aspect-square ${
                router.pathname === "/analytics" && "tab-active"
              }`}
            >
              <Icondashboard
                size={iconSize}
                className="MobileNav-icon group-hover:text-black dark:group-hover:text-neutral-100"
              />
              <span className="tab-tooltip group-hover:scale-100 xl:display:block">
                Dashboard 📊
              </span>
            </button>
          </Tooltip> */}
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
                    {session.user.name &&
                    session.user.name.split(" ").length > 1
                      ? session.user.name.split(" ")[0].charAt(0) +
                        session.user.name.split(" ")[1].charAt(0)
                      : session.user.name.charAt(0)}
                  </p>
                </div>
              </button>
            )}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
