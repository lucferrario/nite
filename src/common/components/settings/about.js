import React from "react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";

function About() {
  return (
    <div className="mb-10">
      <p className="font-semibold text-lg hidden xl:block">About</p>
      <div className="flex mt-5 items-end">
        <div className="w-16 shadow-md rounded-2xl">
          <Image src={logo} alt="nite-icon" />
        </div>
        <div className="ml-5">
          <p className="font-semibold">Nite</p>
          <p className="text-sm text-[color:var(--secondary-color)]">
            Development version
          </p>
        </div>
      </div>
      <p className="mt-5 font-semibold text-lg">Socials</p>
      <div className="flex flex-col mt-3">
        <a
          href="https://nite.sqwre.com"
          className="text-sm text-[color:var(--secondary-color)]"
        >
          Landing page
        </a>
        <a
          href="https://twitter.com/joinnite"
          className="text-sm text-[color:var(--secondary-color)]"
        >
          Twitter
        </a>
        <a
          href="https://www.instagram.com/niteinc/"
          className="text-sm text-[color:var(--secondary-color)]"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}

export default About;
