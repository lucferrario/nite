import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AlertContext from "../../common/contexts/alertcontext";
import { useRouter } from "next/router";

import { getProviders, signIn } from "next-auth/react";

function Signin({ providers }) {
  const { setAlert, setAlertType } = useContext(AlertContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayError, setDisplayError] = useState("");

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Nite - Signin</title>
        <meta name="description" content="Login to nite" />
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
            Sign in
          </h1>
          <p className="font-medium text-[color:var(--secondary-color)] mt-1 text-sm mb-8">
            Sign in and soar to new heights.
          </p>

          <div className="">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-2xl px-6 py-3 bg-[color:var(--bg-secondary)] font-medium outline-none mb-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-2xl px-6 py-3 bg-[color:var(--bg-secondary)] font-medium outline-none mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="rounded-2xl my-2 w-full bg-[color:var(--button-primary)] px-5 py-3 text-[color:var(--inverted-color)] text-center font-semibold"
            onClick={async () => {
              const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
              });
              if (res.error) {
                if (res.error === "CredentialsSignin")
                  setDisplayError("Mhh that doesn't seem right, try again?");
                else if (res.error === "OAuthSignin")
                  setDisplayError(
                    "Oops, something went wrong with the OAuth provider. Try again?"
                  );
                else if (res.error === "OAuthCallback")
                  setDisplayError(
                    "Oops, something went wrong with the OAuth provider. Try again?"
                  );
                else {
                  setDisplayError("Oops, something went wrong. Try again?");
                }
                setAlert(displayError);
                setAlertType("error");
              }

              if (res.ok) {
                setAlert("Logged in successfully", "success");
                setAlertType("success");

                router.push("/home");
              }
            }}
          >
            Sign in
          </button>
          <div className="w-full flex gap-3">
            <button
              className="rounded-2xl mt-2 mb-2 w-full bg-[color:var(--button-secondary)] px-5 py-3 text-center font-semibold flex justify-center items-center"
              onClick={() => signIn("google")}
            >
              <svg
                fill="#000000"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z" />
              </svg>
            </button>

            <button
              className="rounded-2xl mt-2 mb-2 w-full bg-[color:var(--button-secondary)] px-5 py-3 text-center font-semibold flex justify-center items-center"
              onClick={() => signIn("discord")}
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>

          <p className="font-medium text-[color:var(--secondary-color)] mt-4 text-sm">
            {"Forgot your password? "}
            <Link href="/auth/reset">
              <span className="text-[color:var(--primary-color)] font-bold cursor-pointer">
                Reset password
              </span>
            </Link>
          </p>
          <p className="font-medium text-[color:var(--secondary-color)] text-sm">
            {"Don't have an account? "}
            <Link href="/auth/signup">
              <span className="text-[color:var(--primary-color)] font-bold cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>

          {/*Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-2xl mt-2 mb-2 w-full bg-[color:var(--button-primary)] p-4 text-[color:var(--inverted-color)] text-center font-semibold text-sm"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
         ))*/}
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
