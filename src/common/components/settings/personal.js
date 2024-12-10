import React, { useState, useEffect, useContext } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AlertContext from "../../contexts/alertcontext";
import Popup from "./popup";
import axios from "axios";

function Personal() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState(session?.user?.name || "Name");
  const [email, setEmail] = useState(session?.user?.email || "Email");
  const [hoursFormat, setHoursFormat] = useState("12h");
  const [popupOpen, setPopupOpen] = useState(false);
  const { setAlert, setAlertType } = useContext(AlertContext);

  const changeName = () => {
    fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: name,
      }),
    })
      .then(() => {
        setAlert("Name changed successfully");
        setAlertType("standard");
        router.reload();
      })
      .catch(() => {
        setAlert("An error occured");
        setAlertType("error");
      });
  };

  const changeHoursFormat = (h) => {
    setHoursFormat(h);
    axios.put("/api/user", { format: h });
  };

  const changeEmail = () => {
    fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newemail: email,
      }),
    })
      .then(() => {
        setAlert("Email changed successfully");
        setAlertType("standard");
      })
      .catch(() => {
        setAlert("An error occured");
        setAlertType("error");
      });
  };

  useEffect(() => {
    axios
      .get("api/user", {
        params: {
          filter: "getHourFormat",
        },
      })
      .then((res) => {
        setHoursFormat(res.data.hourFormat);
      });
  }, []);

  return (
    <div className="mb-10">
      {popupOpen ? (
        <Popup popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      ) : null}
      <p className="font-semibold text-xl hidden xl:block">Personal</p>
      <div className="mt-6">
        <p className="font-semibold mb-4">Name</p>
        <div className="flex flex-col xl:flex-row">
          <input
            type="text"
            name="nametxt"
            id=""
            className="p-3 px-5 text-sm rounded-2xl box-border min-w-max mb-2 focus:outline-none xl:mb-0 xl:mr-3 xl:w-8/12 bg-[color:var(--bg-secondary)]"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className="rounded-2xl p-3 text-sm focus:outline-none xl:w-4/12 bg-[color:var(--bg-tertiary)]">
            <p
              className="font-semibold dark:text-neutral-200"
              onClick={changeName}
            >
              Change name
            </p>
          </button>
        </div>
      </div>
      <div className="mt-6">
        <p className="font-semibold mb-2 dark:text-neutral-50">Time format</p>
        <select
          name=""
          id=""
          className="p-3 pl-3 rounded-2xl font-medium focus:outline-none md:mt-0 bg-[color:var(--bg-secondary)]"
          onChange={(e) => {
            changeHoursFormat(e.target.value);
          }}
        >
          <option value="12h" selected={hoursFormat === "12h" ? true : false}>
            12 hours
          </option>
          <option value="24h" selected={hoursFormat === "24h" ? true : false}>
            24 hours
          </option>
        </select>
      </div>
      <div className="mt-6">
        <p className="font-semibold mb-2 dark:text-neutral-50">Export Data</p>
        <p className="mb-4 text-sm">
          You can retrieve all of your data every time you wish.
        </p>
        <div className="flex flex-col">
          <button
            className="rounded-2xl p-3 focus:outline-none bg-[color:var(--bg-secondary)]"
            onClick={() => {
              setPopupOpen(true);
            }}
          >
            <p className="font-semibold text-sm">Export all data</p>
          </button>
        </div>
      </div>
      <div className="mt-6">
        <p className="font-semibold mb-4">Account Deletion</p>
        <div className="flex flex-col">
          <button className="rounded-2xl p-3 focus:outline-none bg-[color:var(--error-bg)]">
            <p className="font-semibold text-sm text-[color:var(--error-color)]">
              Delete Account
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personal;
