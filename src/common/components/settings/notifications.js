import React, { useEffect, useState } from "react";

function Notifications() {
  const [open, setOpen] = useState(true);

  const handleNotificationAllow = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("You will receive notifications");
      }
      setOpen(false);
    });
  };

  const handleNotificationDeny = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "denied") {
        new Notification("You will not receive notifications");
      }
      setOpen(false);
    });
  };

  if (!open) return null;
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-5 z-50 shadow-md">
      <p className="font-medium">
        Do you want to receive notifications from nite?
      </p>
      <div className="flex justify-evenly items-center gap-2 mt-5">
        <button
          onClick={handleNotificationAllow}
          className="rounded-xl px-4 py-2 bg-blue-500 text-white w-full font-medium"
        >
          Yes
        </button>
        <button
          onClick={handleNotificationDeny}
          className="rounded-xl px-4 py-2 bg-red-500 text-white w-full font-medium"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default Notifications;
