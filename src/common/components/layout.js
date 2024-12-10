import { useRouter } from "next/router";
import Sidebar from "./sidebars/sidebar";
import CollapsedSidebar from "./sidebars/collapsedsidebar";
import MobileNav from "./sidebars/mobilenav";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import axios from "axios";
import Unauthorized from "./unauthorized";
import Unsigned from "./unsigned";
import Splash from "./splash";
import Settings from "./settings/settings";
import Onboarding from "./onboarding/onboarding";
import DailyModal from "./daily/dailymodal";
import Blurred from "./blurred";
import CustomThemeContext from "../contexts/theme";
import { useSession } from "next-auth/react";
import Modal from "./modal";

const Layout = ({ children, active, setActive }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [permissions, setPermissions] = useState();
  const { themeColor, setThemeColor } = useContext(CustomThemeContext);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [qualityOpen, setQualityOpen] = useState(false);
  const [blurLeft, setBlurLeft] = useState("15%");
  const [fetchCompleted, setFetchCompleted] = useState(false);

  useEffect(() => {
    //do this only if the user is logged in
    if (status === "authenticated") {
      axios.get("/api/permissions").then((res) => {
        setPermissions(res.data.perms);
        setFetchCompleted(true);
      });
      // check modal opening
      axios.get("/api/user").then((res) => {
        window.scrollTo(0, 0);
        session.user = res.data.user;
        setOnboardingOpen(!res.data.user.onboarding);
        if (
          !res.data.user.modalDate ||
          res.data.user.modalDate < new Date().toISOString().split("T")[0]
        ) {
          window.scrollTo(0, 0);
          setQualityOpen(true);
        }
      });
    }
    if (status === "unauthenticated") {
      setFetchCompleted(true);
    }
  }, [status]);

  useEffect(() => {
    if (active) {
      setBlurLeft("15%");
    } else {
      setBlurLeft("5%");
    }
  }, [active]);

  return (
    <>
      <Splash finished={fetchCompleted} />
      {!session ? (
        <>
          <Unsigned />
        </>
      ) : (
        <>
          {!permissions || permissions.beta !== true ? (
            <Unauthorized />
          ) : (
            <div className="relative flex flex-col h-full min-h-screen max-h-screen box-border w-screen sm:p-2 xl:flex-row xl:h-screen">
              <Modal
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                allowClose={true}
              >
                <Settings
                  open={settingsOpen}
                  onClose={() => setSettingsOpen(false)}
                ></Settings>
              </Modal>
              <Modal
                open={qualityOpen}
                onClose={() => setQualityOpen(false)}
                allowClose={true}
              >
                <DailyModal
                  qualityOpen={qualityOpen}
                  setQualityOpen={setQualityOpen}
                />
              </Modal>
              <Modal
                open={onboardingOpen}
                onClose={() => setOnboardingOpen(false)}
                allowClose={false}
              >
                <Onboarding open={onboardingOpen} setOpen={setOnboardingOpen} />
              </Modal>

              {active ? (
                <Sidebar
                  settingsOpen={settingsOpen}
                  setSettingsOpen={setSettingsOpen}
                />
              ) : (
                <CollapsedSidebar
                  settingsOpen={settingsOpen}
                  setSettingsOpen={setSettingsOpen}
                />
              )}
              <MobileNav
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
              />
              <Blurred left={blurLeft} />
              <main className="w-full h-full max-h-screen overflow-y-scroll">
                {children}
              </main>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Layout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }

  return {
    props: {},
  };
}
