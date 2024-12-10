import React, { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import CustomThemeContext from "../common/contexts/theme";
import Journal from "../common/components/journal/journal";

const JournalPage = ({ active, setActive, permissions, onboarding, daily }) => {
  const { themeColor } = useContext(CustomThemeContext);

  return (
    <>
      <Head>
        <title>nite | Journal</title>
        <meta name="description" content="nite Journal" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className="w-full h-full box-border">
        <Journal active={active} setActive={setActive} />
      </div>
    </>
  );
};

export default JournalPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    // Redirect to login page if user is not logged in
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
