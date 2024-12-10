import React, { useState, useContext } from "react";

const AlertContext = React.createContext();

export const AlertProvider = (props) => {
  const [alertText, setAlertText] = useState(null);
  const [alertType, setAlertType] = useState();

  const setAlert = (text) => {
    setAlertText(text);
  };

  const clearAlert = () => {
    setAlertText(null);
  };

  return (
    <AlertContext.Provider
      value={{
        clearAlert,
        alertText,
        setAlert,
        alertType,
        setAlertType,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
