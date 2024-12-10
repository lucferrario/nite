import React, { useState, useEffect } from "react";
import styles from "../../styles/Splash.module.css";

function Splash({ finished }) {
  const [logospan1, setLogoSpan1] = useState(styles.logo);
  const [logospan2, setLogoSpan2] = useState(styles.logo);
  const [container, setContainer] = useState(styles.splashcontainer);

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLogoSpan1(styles.logo + " " + styles.active);
    }, 300);
    setTimeout(() => {
      setLogoSpan2(styles.logo + " " + styles.active);
    }, 600);
  }, []);

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        setTimeout(() => {
          setLogoSpan1(styles.logo + " " + styles.fade);
        }, 50);
        setTimeout(() => {
          setLogoSpan2(styles.logo + " " + styles.fade);
        }, 100);
      }, 2000);
      setTimeout(() => {
        setContainer(styles.splashcontaineropacity);
        setTimeout(() => {
          setContainer(styles.splashcontainerhidden);
          setSplash(false);
        }, 1000);
      }, 2300);
    }
  }, [finished]);

  if (!splash) return null;
  return (
    <div className={container} id="splash">
      <div className="w-full h-full flex flex-col justify-center items-center bg-[color:var(--bg-color)]">
        <p className={`${styles.logop} text-[color:var(--primary-color)]`}>
          <span className={logospan1}>ni</span>
          <span className={logospan2}>te</span>
        </p>
      </div>
    </div>
  );
}

export default Splash;
