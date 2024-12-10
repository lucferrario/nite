import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AlertProvider } from "../common/contexts/alertcontext";
import { CustomThemeProvider } from "../common/contexts/theme";
import { RemountProvider } from "../common/contexts/remount";
import Alert from "../common/components/alert";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import Layout from "../common/components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }

    const customHeight = () => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", customHeight);
    customHeight();
  }, []);

  return (
    <SessionProvider session={session}>
      <RemountProvider>
        <ThemeProvider
          attribute="class"
          themes={["nite-light", "nite-dark", "light", "dark"]}
        >
          <CustomThemeProvider>
            <AlertProvider>
              <Alert />
              <Analytics />
              {router.pathname === "/home" ||
              router.pathname === "/sleep" ||
              router.pathname === "/habits" ||
              router.pathname === "/analytics" ||
              router.pathname === "/journal" ||
              router.pathname.startsWith("/challenge") ? (
                <Layout active={active} setActive={setActive}>
                  <Component
                    {...pageProps}
                    active={active}
                    setActive={setActive}
                  />
                </Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </AlertProvider>
          </CustomThemeProvider>
        </ThemeProvider>
      </RemountProvider>
    </SessionProvider>
  );
}
