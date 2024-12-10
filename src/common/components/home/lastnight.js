import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RemountContext from "../../contexts/remount";

function LastNight() {
  const [time, setTime] = useState("-");
  const [timeSlept, setTimeSlept] = useState(0);
  const [quality, setQuality] = useState("-");
  const [cycles, setCycles] = useState("-");
  const [cycleduration, setCycleduration] = useState(90);
  const [lasttime, setLasttime] = useState(0);

  const [relation, setRelation] = useState(0);

  const [firstDim, setFirstDim] = useState(0);
  const [secondDim, setSecondDim] = useState(0);
  const [thirdDim, setThirdDim] = useState(0);

  const { homeStatsRemount } = useContext(RemountContext);

  useEffect(() => {
    axios
      .get("/api/sleep", { params: { filter: "last" } })
      .then((res) => {
        if (
          res.data.filteredSleep.length > 0 &&
          res.data.filteredSleep[0] !== undefined
        ) {
          const diff =
            (res.data.filteredSleep[0].end - res.data.filteredSleep[0].start) /
            60000;
          const hours = Math.floor(diff / 60);
          const minutes = diff % 60;
          setTimeSlept(diff);
          setTime(`${Math.round(hours)}h ${Math.round(minutes)}m`);
          setQuality(res.data.filteredSleep[0].quality);
          setCycles(Math.floor(diff / cycleduration));

          if (
            res.data.filteredSleep.length > 1 &&
            res.data.filteredSleep[1] !== undefined
          ) {
            const lastdiff =
              (res.data.filteredSleep[1].end -
                res.data.filteredSleep[1].start) /
              60000;
            setLasttime(lastdiff);

            setRelation(
              Math.round(
                ((res.data.filteredSleep[0].quality -
                  res.data.filteredSleep[1].quality) /
                  res.data.filteredSleep[1].quality) *
                  100
              )
            );
          } else {
            // If there's no previous record, set relation to 0 or handle as needed
            setRelation(0);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching sleep data:", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeStatsRemount]);

  useEffect(() => {
    setFirstDim(Math.round((timeSlept * 100) / 540));
    setSecondDim(Number(quality));
    setThirdDim((cycles * 100) / 6);
  }, [secondDim, thirdDim, firstDim, timeSlept, quality, cycles]);

  return (
    <div className="flex p-3 pt-5 rounded-3xl bg-[color:var(--bg-panel)]">
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-5 sm:gap-2 w-full">
        <div className="p-2 pt-0 ">
          <p className="font-semibold text-3xl mt-1 mb-2">
            {relation > 0 ? `+${relation}` : `${relation}`}%
          </p>
          <p className="text-[color:var(--quaternary-color)] text-sm ">
            Compared to the previous night
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p>{time}</p>
            <p className="text-[color:var(--quaternary-color)] text-sm">
              Time asleep
            </p>
          </div>
          <div className="w-full h-28 relative hidden sm:block">
            <div
              className={`absolute bottom-0 bg-[#E9F2FF] rounded-2xl mt-4 w-full transition-all duration-150 ease-linear max-h-full max-w-full`}
              style={{ height: `${firstDim}%` }}
            ></div>
          </div>
          <div className="w-full h-3 relative block sm:hidden">
            <div
              className={`absolute bottom-0 bg-[#E9F2FF] h-full rounded-2xl mt-4 transition-all duration-150 ease-linear max-h-full max-w-full`}
              style={{ width: `${firstDim}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p>
              {isNaN(Math.round(quality)) ? "-" : Math.round(quality) + "%"}
            </p>
            <p className="text-[color:var(--quaternary-color)] text-sm">
              Sleep quality
            </p>
          </div>
          <div className="w-full h-28 relative hidden sm:block">
            <div
              className={`absolute bottom-0 bg-[#F9E3FE] rounded-2xl mt-4 w-full transition-all duration-150 ease-linear max-h-full max-w-full`}
              style={{ height: `${secondDim}%` }}
            ></div>
          </div>
          <div className="w-full h-3 relative block sm:hidden">
            <div
              className={`absolute bottom-0 bg-[#F9E3FE] h-full rounded-2xl mt-4 transition-all duration-150 ease-linear max-h-full max-w-full`}
              style={{ width: `${secondDim}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p>{cycles}</p>
            <p className="text-[color:var(--quaternary-color)] text-sm">
              Cycles slept
            </p>
          </div>
          <div className="w-full h-28 relative hidden sm:block">
            <div
              className={`absolute bottom-0 bg-[#DFFFD4] rounded-2xl mt-4 w-full transition-all duration-150 ease-linear max-h-full max-w-full`}
              //6:cycles = 100:x
              style={{ height: `${thirdDim}%` }}
            ></div>
          </div>
          <div className="w-full h-3 relative block sm:hidden">
            <div
              className={`absolute bottom-0 bg-[#DFFFD4] rounded-2xl mt-4 h-full transition-all duration-150 ease-linear max-h-full max-w-full`}
              //6:cycles = 100:x
              style={{ width: `${thirdDim}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastNight;
