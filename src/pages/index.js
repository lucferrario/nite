import React, { useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import Layout from "../common/components/layout";
import Head from "next/head";
import CustomThemeContext from "../common/contexts/theme";
import Image from "next/image";

function Main() {
  const { themeColor } = useContext(CustomThemeContext);

  return (
    <>
      <title>nite</title>
      <meta name="description" content="nite" />
      <meta name="theme-color" content={themeColor} />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no"
      ></meta>
      <div className="w-screen h-screen flex flex-col justify-center items-center p-10 overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="nite"
          width={48}
          height={48}
          className="rounded-xl"
        />
        <h1 className="mt-8 font-semibold text-2xl">nite</h1>
        <p className="text-gray-400">Closed beta</p>
      </div>
    </>
  );
}

export default Main;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}
