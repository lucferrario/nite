import React, { useState } from "react";

const HabitContext = React.createContext();

export const HabitProvider = (props) => {
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [editingText, setEditingText] = useState("");
  const [editingStatus, setEditingStatus] = useState();
  const [editingNote, setEditingNote] = useState("");
  const [editingRemount, setEditingRemount] = useState(0);

  return (
    <HabitContext.Provider
      value={{
        editing,
        setEditing,
        editingId,
        setEditingId,
        editingText,
        setEditingText,
        editingStatus,
        setEditingStatus,
        editingNote,
        setEditingNote,
        editingRemount,
        setEditingRemount,
      }}
    >
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitContext;
