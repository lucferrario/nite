import React from "react";

function Page({ id, title, content, date, setActiveId }) {
  const handleClick = () => {
    setActiveId(id);
  };

  return (
    <button
      className="rounded-3xl py-4 px-6 bg-[color:var(--bg-panel)] dark:bg-neutral flex flex-col justify-center items-start mb-3 w-full"
      onClick={handleClick} // Trigger active entry when clicked
    >
      <p className="font-semibold text-lg text-left">{title}</p>
      <p className="text-gray-500 text-left">{content}</p>
      <p className="text-gray-500 text-xs mt-3 text-left">
        {date.split("T")[0]}
      </p>
    </button>
  );
}

export default Page;
