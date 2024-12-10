import React, { useState, useEffect } from "react";
import axios from "axios";
import { quotesEmojis } from "../../../data/quotesemojis";

function Quote() {
  const [currentQuote, setCurrentQuote] = useState({});

  const getQuote = () => {
    axios
      .get("/api/user?filter=getGlance")
      .then((response) => {
        setCurrentQuote({
          content: response.data.glance.content,
          author: response.data.glance.author,
          icon: quotesEmojis[Math.floor(Math.random() * quotesEmojis.length)],
        });
      })
      .catch(() => {
        setCurrentQuote({
          content: "Man is a genius when he's dreaming.",
          author: "nite",
          icon: "🌙",
        });
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="flex flex-col rounded-3xl w-full p-3 px-5 bg-[color:var(--bg-panel)]">
      <p className="font-medium">{currentQuote.content}</p>
      <p className="text-sm mt-2 text-[color:var(--secondary-color)]">
        {currentQuote.icon} - {currentQuote.author}
      </p>
    </div>
  );
}

export default Quote;
