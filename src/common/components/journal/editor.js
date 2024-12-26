import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Editor({ id, content, title, trigger, setTrigger, setActiveId }) {
  const [newContent, setNewContent] = useState(content || "");
  const [newTitle, setNewTitle] = useState(title || "");
  const textareaRef = useRef(null);
  const titleRef = useRef(null);

  // Update internal state when content or title props change
  useEffect(() => {
    // Reset internal state if content or title is empty
    if (content === null || content === undefined) {
      setNewContent("");
    } else {
      setNewContent(content);
    }

    if (title === null || title === undefined) {
      setNewTitle("");
    } else {
      setNewTitle(title);
    }
  }, [content, title]); // Triggered when the content or title props change

  // Debouncing for both title and content save
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (newContent !== content || newTitle !== title) {
        if (id) {
          // Update both title and content if `id` exists
          axios
            .put(`/api/journal`, { id, title: newTitle, content: newContent })
            .then((res) => {
              if (!res.data.error) {
              } else {
                console.error(res.data.error);
              }
              setTrigger(Math.random());
            });
        } else {
          // For new entry (no `id`), create a new journal with title and content
          axios
            .post("/api/journal", { title: newTitle, content: newContent })
            .then((res) => {
              if (!res.data.error) {
                setActiveId(res.data.id);
              } else {
                console.error(res.data.error);
              }
              setTrigger(Math.random());
            });
        }
      }
    }, 2000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on re-render
  }, [newContent, newTitle, content, title, id]); // Trigger when content or title changes

  const handleChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div>
      <textarea
        ref={titleRef}
        value={newTitle}
        onChange={handleChangeTitle}
        className="w-full h-fit p-2 border rounded resize-none outline-none bg-transparent border-none text-xl font-semibold"
        placeholder="Title"
        rows={1}
      />
      <textarea
        ref={textareaRef}
        value={newContent}
        onChange={handleChange}
        className="w-full h-auto p-2 border rounded resize-none outline-none bg-transparent border-none"
        placeholder="Write something..."
        style={{ minHeight: "100px" }}
      />
    </div>
  );
}

export default Editor;
