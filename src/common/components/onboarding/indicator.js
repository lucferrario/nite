import React from "react";

function Indicator({ count, current }) {
  var indents = [];
  for (let i = 0; i < count; i++) {
    if (i == current)
      indents.push(
        <div
          className="w-4 h-2 bg-gray-700 rounded-full mx-1 transition-all ease-in-out duration-500"
          key={i}
        ></div>
      );
    else
      indents.push(
        <div
          className="w-2 h-2 bg-gray-300 rounded-full mx-1 transition-all ease-in-out duration-500"
          key={i}
        ></div>
      );
  }
  return (
    <div className="w-full flex justify-center items-center">{indents}</div>
  );
}

export default Indicator;
