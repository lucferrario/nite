import axios from "axios";
import React, { useState, useEffect } from "react";
import QualityCard from "./qualitycard";

function SleepQuality() {
  const [data, setData] = useState([
    { name: "⚡ Energetic", selected: false },
    { name: "😴 Tired", selected: false },
    { name: "👌 Normal", selected: false },
    { name: "🙃 Okay", selected: false },
    { name: "😄 Happy", selected: false },
    { name: "🧘‍♂️ Calm", selected: false },
    { name: "😔 Sad", selected: false },
    { name: "😩 Stressed", selected: false },
  ]);

  useEffect(() => {
    axios
      .get("/api/sleep", {
        params: {
          filter: "day",
        },
      })
      .then((res) => {
        if (res.data.filteredSleep[0]) {
          const selData = res.data.filteredSleep[0].report.split(",");
          const newData = { ...data };
          for (let i = 0; i < data.length; i++) {
            if (selData[i] === "true") {
              newData[i].selected = true;
            }
          }
          const arr = Object.values(newData);
          setData([...arr]);
        }
      });
  }, []);

  const updateData = () => {
    setTimeout(() => {
      const reportArray = data.map((item) => item.selected);
      axios.put("/api/sleep", {
        report: reportArray.join(","),
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col rounded-3xl w-full p-3 bg-[color:var(--bg-panel)]">
      <p className="font-semibold text-lg mb-3">How do you feel today?</p>
      <div className="max-w-max box-border">
        <div className="box-border grid-cols-2 gap-y-2">
          {data
            ? data.map((item, i) => (
                <button
                  key={item.name + item.selected}
                  onClick={() => {
                    const newData = data;
                    newData[i].selected = !newData[i].selected;
                    setData(newData);
                    updateData();
                  }}
                >
                  <QualityCard text={item.name} selected={item.selected} />
                </button>
              ))
            : null}
        </div>
      </div>
      {/* <p className="font-semibold text-lg mb-3 mt-5">
        How long did you sleep?
      </p> */}
      <div className="max-w-max box-border"></div>
    </div>
  );
}

export default SleepQuality;
