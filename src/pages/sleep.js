import React, { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import Sleep from "../common/components/sleep/sleep";
import Head from "next/head";
import CustomThemeContext from "../common/contexts/theme";

const SleepPage = ({ active, setActive }) => {
  const { themeColor } = useContext(CustomThemeContext);

  return (
    <>
      <Head>
        <title>nite | Sleep</title>
        <meta name="description" content="nite Sleep page" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <Sleep active={active} setActive={setActive} />
    </>
  );
};

export default SleepPage;

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
