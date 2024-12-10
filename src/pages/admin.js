import React, { useState, useEffect, useContext } from "react";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Unauthorized from "../common/components/unauthorized";
import Splash from "../common/components/splash";
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabPanelUnstyled,
  TabUnstyled,
} from "@mui/base";
import Head from "next/head";
import AdminSidebar from "../common/components/sidebars/adminsidebar";
import CollapsedAdminSidebar from "../common/components/sidebars/collapsedadminsidebar";
import Blurred from "../common/components/blurred";
import CustomThemeContext from "../common/contexts/theme";
import Settings from "../common/components/settings/settings";

import Users from "../common/components/admin/users/users";
import Sleep from "../common/components/admin/sleep";
import Habits from "../common/components/admin/habits";
import DailyHabit from "../common/components/admin/dailyhabit";
import Permissions from "../common/components/admin/permissions";

function Admin() {
  const router = useRouter();
  const [userPerms, setUserPerms] = useState(0);
  const { themeName, setThemeName, themeColor, setThemeColor } =
    useContext(CustomThemeContext);
  const [active, setActive] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [blurLeft, setBlurLeft] = useState("15%");

  useEffect(() => {
    axios.get("/api/permissions").then((res) => {
      setUserPerms(res.data.perms);
    });
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "light" ||
      document.documentElement.classList.contains("light")
    ) {
      setThemeColor("--bg-color");
    }
    if (
      localStorage.getItem("theme") === "dark" ||
      document.documentElement.classList.contains("dark")
    ) {
      setThemeColor("#171717");
    }
  }, []);

  useEffect(() => {
    if (active) {
      setBlurLeft("15%");
    } else {
      setBlurLeft("5%");
    }
  }, [active]);

  return (
    <>
      <Head>
        <title>Nite</title>
        <meta name="description" content="Nite app" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
        <meta name="theme-color" content={themeColor} />
      </Head>

      <Splash />
      {userPerms.role !== "admin" ? (
        <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-backlight">
          <div className="absolute flex justify-center items-center top-20">
            <div className="relative overflow-hidden w-12 h-120">
              <a href="https://nite.sqwre.com">
                <Image src={logo} alt="logo" className="rounded-xl"></Image>
              </a>
            </div>
            <h2 className="ml-4 font-bold text-2xl dark:text-black">nite</h2>
          </div>
          <div className="text-center px-10">
            <h1 className="font-bold text-6xl mb-5 dark:text-black">
              Protected page
            </h1>
            <p className="dark:text-black">
              Oh no! Looks like you don&apos;t have access to this page.
            </p>
          </div>
        </div>
      ) : (
        <TabsUnstyled defaultValue={0} className="is-active">
          <div className="relative flex flex-col h-full min-h-screen max-h-screen box-border w-screen sm:p-2 xl:flex-row xl:h-screen dark:bg-neutral-900">
            <Settings
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
            ></Settings>
            {active ? (
              <AdminSidebar
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
              />
            ) : (
              <CollapsedAdminSidebar
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
              />
            )}
            <Blurred left={blurLeft} />
            <TabPanelUnstyled value={0} className="w-full ">
              <Users active={active} setActive={setActive} />
            </TabPanelUnstyled>
            <TabPanelUnstyled value={1} className="w-full">
              <Sleep active={active} setActive={setActive} />
            </TabPanelUnstyled>
            <TabPanelUnstyled value={2} className="w-full">
              <Habits active={active} setActive={setActive} />
            </TabPanelUnstyled>
            <TabPanelUnstyled value={3} className="w-full">
              <DailyHabit active={active} setActive={setActive} />
            </TabPanelUnstyled>
            <TabPanelUnstyled value={4} className="w-full">
              <Permissions active={active} setActive={setActive} />
            </TabPanelUnstyled>
          </div>
        </TabsUnstyled>
      )}
    </>
  );
}

export default Admin;
