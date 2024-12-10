import React, { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import Dashboard from "../common/components/dashboard/dashboard";
import Head from "next/head";
import CustomThemeContext from "../common/contexts/theme";

const Analytics = ({ active, setActive }) => {
  const { themeColor } = useContext(CustomThemeContext);

  return (
    <>
      <Head>
        <title>nite | Analytics</title>
        <meta name="description" content="nite Analytics page" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <Dashboard active={active} setActive={setActive} />
    </>
  );
};

export default Analytics;

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
