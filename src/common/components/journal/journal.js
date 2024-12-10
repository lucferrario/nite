import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "../header";
import Editor from "./editor";
import Spinner from "../spinner";
import Pages from "./pages";
import Controls from "./controls";
import axios from "axios";

function Journal({ active, setActive }) {
  const [entries, setEntries] = useState([]);
  const [activeEntry, setActiveEntry] = useState(null);

  //get all entries
  useEffect(() => {
    axios.get("/api/journal").then((res) => {
      if (!res.data.error) {
        if (res.data.entries.length > 0) {
          setEntries(res.data.entries);
        } else {
          console.error("No entries found");
        }
      } else {
        console.error(res.data.error);
      }
    });
  }, []);

  return (
    <div className="relative w-full h-full box-border rounded-3xl pt-8 p-5 2xl:p-8 pb-32 xl:pb-8">
      <Header active={active} setActive={setActive} />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 lg:mr-8 flex flex-col">
          <div className="flex flex-col">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Drop some thoughts
            </p>
            <div className="w-full h-full p-5 rounded-3xl bg-[color:var(--bg-panel)] dark:bg-neutral">
              <Editor
                content={activeEntry && activeEntry.content}
                id={activeEntry && activeEntry.id}
              />
              <Controls activeEntry={activeEntry} />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
            Your entries
          </p>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Pages key={entry.id} id={entry.id} content={entry.content} />
            ))
          ) : (
            <div className="p-5 rounded-3xl bg-[color:var(--bg-panel)] dark:bg-neutral text-gray-500 italic">
              No entries found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Journal;
