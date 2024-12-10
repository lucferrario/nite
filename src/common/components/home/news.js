import React, { useEffect, useState } from "react";
import Image from "next/image";
import demo from "../../../../public/images/demonw.jpg";
import logo from "../../../../public/images/logo.png";

function News({ newsOpen, setNewsOpen }) {
  //get from db api next
  const [title, setTitle] = useState(
    "Fostering Pro-Sleep Habits During the Day"
  );
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(
    "Setting the table for high-quality sleep is an all-day affair. A handful of steps that you can take during the day can pave the way for better sleep at night. "
  );

  return (
    <div className="p-3 rounded-3xl bg-[color:var(--bg-panel)]">
      <div
        className="relative box-border rounded-2xl mb-5 bg-cover bg-no-repeat overflow-hidden aspect-[21/9] 2xl:aspect-[21/7] cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0 });
          setNewsOpen(true);
        }}
      >
        <Image src={demo} alt="News cover" fill={true}></Image>
        <div className="absolute bottom-2 right-2 h-10 aspect-square sm:bottom-5 sm:right-5 sm:h-12">
          <Image src={logo} alt="logo" fill={true} />
        </div>
      </div>
      <p className="font-semibold text-lg mb-3">{title}</p>
      <p className="text-sm">{preview}</p>
    </div>
  );
}

export default News;
