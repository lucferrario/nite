import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AlertContext from "../../../contexts/alertcontext";
import UserTableItem from "./usertableitem";

function UserTable() {
  const { setAlert, setAlertType } = useContext(AlertContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/permissions").then((res) => {
      if (res.data.perms.role === "admin") {
        axios
          .get("/api/admin/users")
          .then((res) => {
            setUsers(res.data.allUsers);
          })
          .catch((err) => {
            setAlertType("error");
            setAlert("Error: " + err.response.data.error);
          });
      } else {
      }
    });
  }, []);

  return (
    <div className="p-3 bg-white rounded-3xl grid grid-rows-auto grid-cols-1 gap-y-2 dark:bg-neutral-700 z-[5]">
      <div
        className="w-full grid rounded-2xl p-4 py-3 bg-none dark:bg-neutral-500 justify-center items-center"
        style={{
          gridTemplateColumns: "48px 5fr 5fr 3fr 3fr 3fr 3fr",
        }}
      >
        <p className="font-medium"></p>
        <p className="font-semibold">Name</p>
        <p className="font-semibold">Email</p>
        <p className="font-semibold">Onboarding</p>
        <p className="font-semibold">Hour Format</p>
        <p className="font-semibold">Last check-in</p>
        <p className="font-semibold">Role</p>
      </div>
      {users.map((user, i) => (
        <UserTableItem user={user} key={i} />
      ))}
    </div>
  );
}

export default UserTable;
