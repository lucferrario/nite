import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function Editor({ id, content }) {
  const [newContent, setNewContent] = useState(content);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleChange = (e) => {
    setNewContent(e.target.value);
    //after two seconds being idle, save the content
    setTimeout(() => {
      if (id) {
        axios
          .put(`/api/journal`, { id: id, content: newContent })
          .then((res) => {
            if (!res.data.error) {
              console.log("Content saved");
            } else {
              console.error(res.data.error);
            }
          });
      } else {
        axios.post("/api/journal", { content: newContent });
      }
    }, 2000);
  };

  return (
    <textarea
      ref={textareaRef}
      value={newContent}
      onChange={handleChange}
      className="w-full h-auto p-2 border rounded resize-none outline-none bg-transparent border-none"
      placeholder="Write something..."
      style={{ minHeight: "100px" }}
    />
  );
}

export default Editor;
