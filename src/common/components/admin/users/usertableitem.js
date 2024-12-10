import React from "react";
import Image from "next/image";
import IconTrash from "../../icons/icontrash";
import IconEdit from "../../icons/iconedit";

function UserTableItem({ user }) {
  // params: {
  //   name,
  //   email,
  //   onboarding,
  //   hourFormat,
  //   modalDate,
  //   permissionsId,
  // }

  return (
    <div
      className="w-full grid rounded-2xl p-3 py-2 bg-gray-100 dark:bg-neutral-500 justify-center items-center"
      style={{ gridTemplateColumns: "48px 5fr 5fr 3fr 3fr 3fr 3fr 30px 30px" }}
    >
      <div className="relative h-8 w-8 rounded-full">
        <img src={user.image} alt="" className="rounded-full" />
      </div>
      <p className="font-medium">{user.name}</p>
      <p>{user.email}</p>
      <p>{String(user.onboarding)}</p>
      <p>{user.hourFormat}</p>
      <p>{user.modalDate}</p>
      <p>{user.permissions.role}</p>
      <button className="flex justify-end">
        <IconEdit size={20} />
      </button>
      <button className="flex justify-end">
        <IconTrash size={20} color={"#FF0000"} />
      </button>
    </div>
  );
}

export default UserTableItem;
