import React, { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import Home from "../common/components/home/home";
import { HabitProvider } from "../common/contexts/habit";
import Head from "next/head";
import CustomThemeContext from "../common/contexts/theme";
import Unsigned from "../common/components/unsigned";
import Unauthorized from "../common/components/unauthorized";

const HomePage = ({ active, setActive, permissions, onboarding, daily }) => {
  const { themeColor } = useContext(CustomThemeContext);

  return (
    <>
      <Head>
        <title>nite | Home</title>
        <meta name="description" content="nite Home page" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <HabitProvider>
        <Home active={active} setActive={setActive} />
      </HabitProvider>
    </>
  );
};

export default HomePage;

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

  // Fetch data from API
  // try {
  //   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/permissions`, {
  //     headers: {
  //       // Pass session information to the API
  //       cookie: context.req.headers.cookie,
  //     },
  //   });
  //   if (!res.ok) {
  //     throw new Error(`API request failed with status code ${res.status}`);
  //   }
  //   const data = await res.json();
  //   const res2 = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
  //     headers: {
  //       // Pass session information to the API
  //       cookie: context.req.headers.cookie,
  //     },
  //   });
  //   if (!res2.ok) {
  //     throw new Error(`API request failed with status code ${res2.status}`);
  //   }
  //   const data2 = await res2.json();

  //   return {
  //     props: {
  //       permissions: data.perms,
  //       onboarding: data2.user.onboarding,
  //       daily: data2.user.modalDate < new Date().toISOString().split("T")[0],
  //     },
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     props: {},
  //   };
  // }

  return {
    props: {},
  };
}
