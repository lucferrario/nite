import React, { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

function Popup({ type, text, popupOpen, setPopupOpen }) {
  const [fileName, setFileName] = useState("");

  const download = (type) => {
    axios.get("/api/user").then((res) => {
      let bl;
      let name;
      if (!fileName) {
        name = "data";
      } else {
        name = fileName;
      }
      const json = JSON.stringify(res.data);
      if (type === "json") {
        bl = new Blob([json], { type: "application/json" });
      } else if (type === "txt") {
        bl = new Blob([json], { type: "text/plain" });
      }
      const href = URL.createObjectURL(bl);

      const link = document.createElement("a");
      link.href = href;
      link.download = name + "." + type;
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const onClose = () => {
    setPopupOpen(false);
  };

  if (!popupOpen) return null;
  return (
    <>
      <div
        id="modalshadow"
        className="box-border shadow-lg absolute top-0 left-0 max-h-5/6 max-w-5/6 w-5/6 md:w-2/3 lg:w-1/2 overflow-hidden z-50 p-5 bg-white rounded-3xl dark:bg-neutral-700 dark:shadow-md"
      >
        <div className="p-5 relative">
          <div className="absolute w-full top-2 right-2 flex justify-end">
            <IoMdClose onClick={onClose} className="cursor-pointer" />
          </div>
          <p className="font-semibold text-lg dark:text-white ">Warning</p>
          <p className="mt-2 mb-5">
            You are about to download all data related to your account
          </p>
          <input
            type="text"
            name="filename"
            id=""
            placeholder="data"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="bg-gray-200 py-4 px-6 w-full rounded-2xl focus:outline-none"
          />
          <div className="flex mt-3">
            <button
              className="w-full bg-gray-400 rounded-2xl py-4 px-6 font-medium mr-2"
              onClick={() => {
                download("json");
                onClose();
              }}
            >
              json
            </button>
            <button
              className="w-full bg-gray-400 rounded-2xl py-4 px-6 font-medium ml-2"
              onClick={() => {
                download("txt");
                onClose();
              }}
            >
              text
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
