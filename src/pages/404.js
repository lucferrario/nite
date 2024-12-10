import React from "react";
import Image from "next/image";

function Custom404() {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-[color:var(--bg-color)]">
      <div className="absolute flex justify-center items-center top-20">
        <div className="relative overflow-hidden w-12 h-12">
          <a href="https://nite.sqwre.com">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={48}
              height={48}
              className="rounded-xl"
            ></Image>
          </a>
        </div>
        <h2 className="ml-4 font-bold text-2xl">nite</h2>
      </div>
      <div className="text-center px-10">
        <h1 className="font-bold text-6xl mb-5">404</h1>
        <p>Looks like the page you were looking for does not exist :(</p>
      </div>
    </div>
  );
}

export default Custom404;
