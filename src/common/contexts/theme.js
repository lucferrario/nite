import React, { useState, useContext, useEffect } from "react";
import { useTheme } from "next-themes";

const CustomThemeContext = React.createContext();

export const CustomThemeProvider = (props) => {
  const [themeColor, setThemeColor] = useState("");
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    var r = document.querySelector(":root");

    if (theme === "dark" || resolvedTheme === "dark") {
      setThemeColor("#171717");
      r.style.setProperty("--main-color", "#ffffff");
      r.style.setProperty("--inverted-color", "#000000");
      r.style.setProperty("--secondary-color", "#d4d4d4");
      r.style.setProperty("--tertiary-color", "#737373");
      r.style.setProperty("--active-color", "#a3a3a3");
      r.style.setProperty("--bg-color", "#171717");
      r.style.setProperty("--bg-panel", "#262626");
      r.style.setProperty("--bg-habit", "#525252");
      r.style.setProperty("--bg-secondary", "#404040");
      r.style.setProperty("--bg-tertiary", "#525252");
      r.style.setProperty("--bg-hover", "#40404090");
      r.style.setProperty("--bg-sidebar", "#40404050");
      r.style.setProperty("--bg-sidebar-hover", "#40404030");
      r.style.setProperty("--bg-inverted-translucid", "#e5e5e550");
      r.style.setProperty("--bg-inverted-hover", "#e5e5e580");
      r.style.setProperty("--error-bg", "#f8717150");
      r.style.setProperty("--button-primary", "#e5e5e5");
      r.style.setProperty("--button-secondary", "#a3a3a3");
      r.style.setProperty("--card-primary", "#404040");
      r.style.setProperty("--card-selected", "#737373");
      r.style.setProperty("--checkbox-primary", "#a3a3a3");
      r.style.setProperty("--checkbox-selected", "#f5f5f5");
    }
    if (theme === "light" || resolvedTheme === "light") {
      setThemeColor("#f6f6f6");
      r.style.setProperty("--main-color", "#000000");
      r.style.setProperty("--inverted-color", "#FFFFFF");
      r.style.setProperty("--secondary-color", "#262626");
      r.style.setProperty("--tertiary-color", "#525252");
      r.style.setProperty("--active-color", "#9CA3AF");
      r.style.setProperty("--bg-color", "#F6F6F6");
      r.style.setProperty("--bg-panel", "#FFFFFF");
      r.style.setProperty("--bg-habit", "#f3f4f6");
      r.style.setProperty("--bg-secondary", "#F6F6F6");
      r.style.setProperty("--bg-tertiary", "#e5e5e5");
      r.style.setProperty("--bg-hover", "#e5e7eb90");
      r.style.setProperty("--bg-sidebar", "#F5F7FA");
      r.style.setProperty("--bg-sidebar-hover", "#f5f7fa50");
      r.style.setProperty("--bg-inverted-translucid", "#26262650");
      r.style.setProperty("--bg-inverted-hover", "#26262680");
      r.style.setProperty("--error-bg", "#fee2e2");
      r.style.setProperty("--button-primary", "#262626");
      r.style.setProperty("--button-primary", "#525252");
      r.style.setProperty("--card-primary", "#f3f4f6");
      r.style.setProperty("--card-selected", "#d1d5db");
      r.style.setProperty("--checkbox-primary", "#d4d4d4");
      r.style.setProperty("--checkbox-selected", "#262626");
    }
    if (theme === "nite-light" || resolvedTheme === "nite-light") {
      setThemeColor("#fef2ff");
      r.style.setProperty("--main-color", "#000000");
      r.style.setProperty("--inverted-color", "#FFFFFF");
      r.style.setProperty("--secondary-color", "#262626");
      r.style.setProperty("--tertiary-color", "#525252");
      r.style.setProperty("--active-color", "#dbcedd");
      r.style.setProperty("--bg-color", "#fef2ff");
      r.style.setProperty("--bg-panel", "#FFFFFF");
      r.style.setProperty("--bg-habit", "#F6F3F6");
      r.style.setProperty("--bg-secondary", "#F8F3F8");
      r.style.setProperty("--bg-tertiary", "#F0E3F0");
      r.style.setProperty("--bg-hover", "#F3EAF3");
      r.style.setProperty("--bg-sidebar", "#fff9ff");
      r.style.setProperty("--bg-sidebar-hover", "#fff9ff50");
      r.style.setProperty("--bg-inverted-translucid", "#2D012E50");
      r.style.setProperty("--bg-inverted-hover", "#2D012E80");
      r.style.setProperty("--error-bg", "#fee2e2");
      r.style.setProperty("--button-primary", "#2D012E");
      r.style.setProperty("--button-secondary", "#f6f3f6");
      r.style.setProperty("--card-primary", "#F6F3F6");
      r.style.setProperty("--card-selected", "#E9D4ED");
      r.style.setProperty("--checkbox-primary", "#DBCEDD");
      r.style.setProperty("--checkbox-selected", "#262626");
    }
    if (theme === 'mday' || resolvedTheme === 'mday') {
      setThemeColor('#aeaeae');
      r.style.setProperty('--main-color', '#000000');
      r.style.setProperty('--inverted-color', '#FFFFFF');
      r.style.setProperty('--secondary-color', '#152f63');
      r.style.setProperty('--tertiary-color', '#E2E9FF');
      r.style.setProperty('--active-color', '#dbcedd');
      r.style.setProperty('--bg-color', '#EBF0F9');
      r.style.setProperty('--bg-panel', '#F9FBFF');
      r.style.setProperty('--bg-habit', '#EBF1FD');
      r.style.setProperty('--bg-secondary', '#A2B4E3');
      r.style.setProperty('--bg-tertiary', '#C8D7F3');
      r.style.setProperty('--bg-hover', '#F3EAF3');
      r.style.setProperty('--bg-sidebar', '#ECF1FA');
      r.style.setProperty('--bg-sidebar-hover', '#F6F7FA');
      r.style.setProperty('--bg-inverted-translucid', '#2D012E50');
      r.style.setProperty('--bg-inverted-hover', '#2D012E80');
      r.style.setProperty('--error-bg', '#A2B4E3');
      r.style.setProperty('--button-primary', '#15387D');
      r.style.setProperty('--button-secondary', '#312054');
      r.style.setProperty('--card-primary', '#D5DEF6');
      r.style.setProperty('--card-selected', '#A2B4E3');
      r.style.setProperty('--checkbox-primary', '#929FCF');
      r.style.setProperty('--checkbox-selected', '#313E6C');
    }
  }, [resolvedTheme, theme]);

  return (
    <CustomThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
      }}
    >
      {props.children}
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeContext;
