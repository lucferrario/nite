import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useRouter } from "next/router";

function Unsigned() {
  const router = useRouter();

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-[color:var(--bg-color)]">
      <div className="absolute flex justify-center items-center top-20">
        <div className="relative overflow-hidden w-12 h-12">
          <a href="https://nite.sqwre.com">
            <Image src={logo} alt="logo" className="rounded-xl"></Image>
          </a>
        </div>
        <h2 className="ml-4 font-bold text-2xl text-[color:var(--primary-color)]">
          nite
        </h2>
      </div>
      <div className="text-center px-10">
        <h1 className="font-bold text-6xl mb-5 text-[color:var(--primary-color)]">
          Protected page
        </h1>
        <p className="text-[color:var(--secondary-color)]">
          Looks like you are not signed in. Don&apos;t worry, you can sign in{" "}
          <span
            onClick={() => router.push("/auth/signin")}
            className="text-blue-800 cursor-pointer"
          >
            here
          </span>{" "}
          .
        </p>
      </div>
    </div>
  );
}

export default Unsigned;
