import React, { useState, useContext } from "react";

const RemountContext = React.createContext();

export const RemountProvider = (props) => {
  const [homeStatsRemount, setHomeStatsRemount] = useState(0);
  const [challengesRemount, setChallengesRemount] = useState(0);
  const [habitsRemount, setHabitsRemount] = useState(0);

  return (
    <RemountContext.Provider
      value={{
        homeStatsRemount,
        setHomeStatsRemount,
        challengesRemount,
        setChallengesRemount,
        habitsRemount,
        setHabitsRemount,
      }}
    >
      {props.children}
    </RemountContext.Provider>
  );
};

export default RemountContext;
