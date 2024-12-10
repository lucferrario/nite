import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import alertContext from "../../contexts/alertcontext";
import appearancelight from "../../../../public/images/appearancelight.png";
import appearancedark from "../../../../public/images/appearancedark.png";
import appearanceauto from "../../../../public/images/appearanceauto.png";
import appearancenitelight from "../../../../public/images/appearancenitelight.png";
import appearenceMDay from "../../../../public/images/appearancemday.png";

function Appearance() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { setAlert, setAlertType } = useContext(alertContext);

  const [lightSelected, setLightSelected] = useState(
    "rounded-xl border-blue-600 border-4 cursor-pointer lg:rounded-2xl"
  );
  const [darkSelected, setDarkSelected] = useState(
    "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
  );
  const [autoSelected, setAutoSelected] = useState(
    "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
  );
  const [niteLightSelected, setNiteLightSelected] = useState(
    "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
  );
  const [mDaySelected, setMDaySelected] = useState(
    "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
  );
  const [lightText, setLightText] = useState("✔️ Light");
  const [darkText, setDarkText] = useState("Dark");
  const [autoText, setAutoText] = useState("Auto");
  const [niteLightText, setNiteLightText] = useState("Nite Light");
  const [mDayText, setMdayText] = useState("Day One");

  const setLightTheme = () => {
    localStorage.theme = "light";
    setTheme("light");
    setAlert("Light theme selected");
  };

  const setDarkTheme = () => {
    localStorage.theme = "dark";
    setTheme("dark");
    setAlert("Dark theme selected");
  };

  const setAutoTheme = () => {
    localStorage.removeItem("theme");
    setTheme("system");
    setAlert("System theme selected");
  };

  const setNiteLightTheme = () => {
    localStorage.theme = "nite-light";
    setTheme("nite-light");
    setAlert("Nite Light theme selected");
  };
  const setMDayTheme = () => {
    localStorage.theme = "mday";
    setTheme("mday");
    setAlert("Day One theme selected");
  };

  useEffect(() => {
    if (theme === "light") {
      setLightSelected(
        "rounded-xl border-blue-600 border-4 cursor-pointer lg:rounded-2xl"
      );
      setDarkSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setAutoSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setNiteLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setMDaySelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setLightText("✔️ Light");
      setDarkText("Dark");
      setAutoText("Auto");
      setNiteLightText("Nite Light");
      setMdayText("Day One");
    }
    if (theme === "dark") {
      setLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setDarkSelected(
        "rounded-xl border-blue-600 border-4 cursor-pointer lg:rounded-2xl"
      );
      setAutoSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setNiteLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setMDaySelected(
        "rounded-lg border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setLightText("Light");
      setDarkText("✔️ Dark");
      setAutoText("Auto");
      setNiteLightText("Nite Light");
      setMdayText("Day One");
    }
    if (theme === "system") {
      setLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setDarkSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setAutoSelected(
        "rounded-xl border-blue-600 border-4 cursor-pointer lg:rounded-2xl"
      );
      setNiteLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setMDaySelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setLightText("Light");
      setDarkText("Dark");
      setAutoText("✔️ Auto");
      setNiteLightText("Nite Light");
      setMdayText("Day One");
    }
    if (theme === "nite-light") {
      setLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setDarkSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setAutoSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setNiteLightSelected(
        "rounded-xl border-blue-600 border-4 cursor-pointer lg:rounded-2xl"
      );
      setMDaySelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setLightText("Light");
      setDarkText("Dark");
      setAutoText("Auto");
      setNiteLightText("✔️ Nite Light");
      setMdayText("Day One");
    }
    if (theme === "mday") {
      setLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setDarkSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setAutoSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setNiteLightSelected(
        "rounded-xl border-[color:var(--bg-panel)] border-4 cursor-pointer lg:rounded-2xl"
      );
      setMDaySelected(
        "rounded-xl border-blue-600 border-4 cursor-pointer lg:rounded-2xl"
      );

      setLightText("Light");
      setDarkText("Dark");
      setAutoText("Auto");
      setNiteLightText("Nite Light");
      setMdayText("✔️ Day One");
    }
  }, [theme]);

  return (
    <div className="mb-10">
      <p className="font-semibold text-xl hidden xl:block">Appearance</p>
      <div className="mt-6">
        <p className="font-semibold mb-4">Theme</p>
        <div className="grid grid-cols-2 row-auto lg:grid-cols-4 gap-y-4">
          <div className="mr-4 max-w-[200px]">
            <Image
              src={appearanceauto}
              alt="appearance auto"
              className={autoSelected}
              onClick={() => {
                setAutoTheme();
              }}
            />
            <p className="font-medium text-sm mt-2">{autoText}</p>
          </div>
          <div className="mr-4 max-w-[200px]">
            <Image
              src={appearancelight}
              alt="appearancelight"
              className={lightSelected}
              onClick={() => {
                setLightTheme();
              }}
            />
            <p className="font-medium text-sm mt-2">{lightText}</p>
          </div>
          <div className="mr-4 max-w-[200px]">
            <Image
              src={appearancedark}
              alt="appearancedark"
              className={darkSelected}
              onClick={() => {
                setDarkTheme();
              }}
            />
            <p className="font-medium text-sm mt-2">{darkText}</p>
          </div>
          <div className="mr-4 max-w-[200px]">
            <Image
              src={appearancenitelight}
              alt="appearance nite light"
              className={niteLightSelected}
              onClick={() => {
                setNiteLightTheme();
              }}
            />
            <p className="font-medium text-sm mt-2">{niteLightText}</p>
          </div>
          <div className="mr-4 max-w-[200px]">
            <Image
              src={appearenceMDay}
              alt="appearance Marconi's Day"
              className={mDaySelected}
              onClick={() => {
                setMDayTheme();
              }}
            />
            <p className="font-medium text-sm mt-2">{mDayText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
