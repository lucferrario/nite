import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";
import axios from "axios";
import AlertContext from "../../common/contexts/alertcontext";

import { getProviders, signIn } from "next-auth/react";

function Signin({ providers }) {
  const { setAlert, setAlertType } = useContext(AlertContext);

  const [displayname, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Account recovery");
  const [subTitle, setSubTitle] = useState(
    "Enter your email to reset your password."
  );
  const [isSignIn, setIsSignIn] = useState(false);

  const sendLink = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/auth/reset", {
        email,
      })
      .then((res) => {
        setTitle("Mail sent!");
        setSubTitle(
          "Please check your inbox. If you don't see it, check spam."
        );
        setIsSignIn(true);
      })
      .catch((err) => {
        setTitle("Mail already sent");
        setSubTitle(
          "Please check your inbox. If you don't see it, check spam. If you still can't find it, try again in an hour."
        );
        setIsSignIn(true);
      });
  };

  return (
    <>
      <Head>
        <title>Nite - Account recovery</title>
        <meta name="description" content="Reset your nite password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen m-0 p-0 box-border flex flex-col justify-center items-center bg-[color:var(--bg-color)]">
        <div className="flex justify-center items-center mb-14">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="shadow-md rounded-2xl"
          />
          <h1 className="font-bold text-2xl ml-4 text-[color:var(--primary-color)]">
            nite
          </h1>
        </div>
        <div className="bg-[color:var(--bg-panel)] rounded-3xl p-10 w-11/12 max-w-[400px] shadow-md">
          <h1 className="font-semibold text-3xl text-[color:var(--primary-color)]">
            {title}
          </h1>
          <p className="font-medium text-[color:var(--secondary-color)] mt-1 text-sm mb-8">
            {subTitle}
          </p>

          <div className={isSignIn ? "hidden" : ""}>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-2xl px-6 py-3 bg-[color:var(--bg-secondary)] font-medium outline-none mb-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="rounded-2xl my-2 w-full bg-[color:var(--button-primary)] px-5 py-3 text-[color:var(--inverted-color)] text-center font-semibold"
              onClick={(e) => sendLink(e)}
            >
              Send reset link
            </button>

            <p className="font-medium text-[color:var(--secondary-color)] mt-4 text-sm">
              Remember your password?{" "}
              <Link href="/auth/signin">
                <span className="text-[color:var(--primary-color)] font-bold cursor-pointer">
                  Sign in
                </span>
              </Link>
            </p>
          </div>

          <div className={!isSignIn ? "hidden" : ""}>
            <button
              className="rounded-2xl mt-2 mb-2 w-full bg-[color:var(--button-primary)] p-4 text-[color:var(--inverted-color)] text-center font-semibold text-sm"
              onClick={() => signIn()}
            >
              {"Go back to sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
