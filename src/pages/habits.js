import React, { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import Habits from "../common/components/habits/habits";
import { HabitProvider } from "../common/contexts/habit";
import Head from "next/head";
import CustomThemeContext from "../common/contexts/theme";

const HabitsPage = ({ active, setActive }) => {
  const { themeColor } = useContext(CustomThemeContext);

  return (
    <>
      <Head>
        <title>nite | Habits</title>
        <meta name="description" content="nite Habits page" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <HabitProvider>
        <Habits active={active} setActive={setActive} />
      </HabitProvider>
    </>
  );
};

export default HabitsPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }

  return {
    props: {},
  };
}
