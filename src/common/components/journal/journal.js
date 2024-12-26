import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header";
import Editor from "./editor";
import Spinner from "../spinner";
import Page from "./page";
import Controls from "./controls";

function Journal({ active, setActive }) {
  const [entries, setEntries] = useState([]);
  const [activeEntry, setActiveEntry] = useState(null);
  const [activeId, setActiveId] = useState("");
  const [trigger, setTrigger] = useState(false);

  const clearEditor = () => {
    setActiveId("");
    setActiveEntry(null);
  };

  // Fetch all entries
  useEffect(() => {
    axios
      .get("/api/journal")
      .then((res) => {
        if (!res.data.error) {
          if (res.data.length > 0) {
            setEntries(res.data);
          } else {
            console.error("No entries found");
          }
        } else {
          console.error(res.data.error);
        }
      })
      .catch((err) => console.error(err));
  }, [trigger]);

  // Fetch a single entry when activeId changes
  useEffect(() => {
    if (activeId) {
      axios
        .get(`/api/journal?id=${activeId}`)
        .then((res) => {
          if (!res.data.error) {
            setActiveEntry(res.data);
          } else {
            console.error(res.data.error);
          }
        })
        .catch((err) => console.error(err));
    } else {
      // Reset activeEntry when activeId is empty
      setActiveEntry(null);
    }
  }, [activeId]);

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
                content={activeEntry ? activeEntry.content : ""}
                title={activeEntry ? activeEntry.title : ""}
                id={activeEntry ? activeEntry.id : ""}
                trigger={trigger}
                setTrigger={setTrigger}
                setActiveId={setActiveId}
              />
              <Controls
                activeId={activeId}
                trigger={trigger}
                setTrigger={setTrigger}
                clearEditor={clearEditor}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
            Your entries
          </p>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Page
                key={entry.id}
                id={entry.id}
                title={entry.title}
                content={entry.content}
                date={entry.createdAt}
                setActiveId={setActiveId} // Passing down function to set active entry
              />
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
