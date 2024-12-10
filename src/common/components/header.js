import React, { useState, useEffect } from "react";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { BsLayoutSidebarInset } from "react-icons/bs";
import Tooltip from "./tooltip";
import { useSession, signIn, signOut } from "next-auth/react";

function Header({ active, setActive }) {
  const [partOfTheDay, setPartOfTheDay] = useState();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const date = new Date();
    setPartOfTheDay(date.getHours() > 12 ? "Afternoon" : "Morning");

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setDay(weekdays[date.getDay()]);
    setMonth(months[date.getMonth()]);
    setNumber(date.getDate());
  }, []);

  const { data: session, status } = useSession();

  return (
    <div className="flex items-center">
      <Tooltip title={"Toggle sidebar"} className="hidden xl:block">
        <div className="hidden xl:block">
          {active ? (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => {
                  setActive(!active);
                }}
                className="mr-5 cursor-pointer dark:text-white"
              >
                <path
                  d="M1 15V9C1 4.58172 4.58172 1 9 1H15C19.4183 1 23 4.58172 23 9V15C23 19.4183 19.4183 23 15 23H9C4.58172 23 1 19.4183 1 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 15V9C12 7.34315 13.3431 6 15 6C16.6569 6 18 7.34315 18 9V15C18 16.6569 16.6569 18 15 18C13.3431 18 12 16.6569 12 15Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => {
                  setActive(!active);
                }}
                className="mr-5 cursor-pointer dark:text-white"
              >
                <path
                  d="M1 15V9C1 4.58172 4.58172 1 9 1H15C19.4183 1 23 4.58172 23 9V15C23 19.4183 19.4183 23 15 23H9C4.58172 23 1 19.4183 1 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M6 15V9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9V15C12 16.6569 10.6569 18 9 18C7.34315 18 6 16.6569 6 15Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </>
          )}
        </div>
      </Tooltip>
      <div className="ml-2 xl:ml-0">
        <p className="text-2xl font-semibold 2xl:text-3xl dark:text-white">
          Good {partOfTheDay},{" "}
          {status === "authenticated"
            ? session.user.name.split(" ")[0]
            : "Guest"}
        </p>
        <p className="text-gray-400">
          It&apos;s {day}, {month} {number}
        </p>
      </div>
    </div>
  );
}

export default Header;
