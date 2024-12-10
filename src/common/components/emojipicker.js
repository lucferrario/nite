import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

function Emojipicker({ emojiOpen, setEmojiOpen, emoji, setEmoji, parent }) {
  const handleEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject);
    setEmojiOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const emojiPicker = document.querySelector(".content-wrapper-epr");
      if (emojiOpen && emojiPicker && !emojiPicker.contains(event.target)) {
        setEmojiOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiOpen, setEmojiOpen]);

  if (!emojiOpen) return null;
  return (
    <>
      {createPortal(
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar={true}
          disableSkinTonePicker={true}
        />,
        parent ? document.querySelector(parent) : document.body
      )}
    </>
  );
}

export default Emojipicker;
