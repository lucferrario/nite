import React, { useState, useEffect } from "react";
import axios from "axios";
import Nap from "./nap";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

function NapList() {
  const [naps, setNaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [napRemount, setNapRemount] = useState(false);

  useEffect(() => {
    axios.get("/api/naps?filter=week").then((res) => {
      setNaps(res.data.naps.reverse());
      setLoading(false);
    });
  }, [napRemount]);

  return (
    <div className="flex flex-col p-3 rounded-3xl bg-[color:var(--bg-panel)] gap-y-2">
      {loading ? (
        <Skeleton
          variant="rounded"
          height={44}
          animation="wave"
          style={{
            borderRadius: 16,
            backgroundColor: "var(--bg-habit)",
            opacity: 0.7,
          }}
        />
      ) : (
        <>
          {naps.length > 0 ? (
            <>
              <div
                className="hidden sm:visible sm:grid justify-between items-center mb-1 gap-5"
                style={{
                  gridTemplateColumns: "4fr 3fr 10fr",
                }}
              >
                <p className="font-medium ml-2">Date</p>
                <p className="font-medium">Duration</p>
                <p className="font-medium ml-1">Note</p>
              </div>
              {naps.map((nap) => {
                return (
                  <Nap
                    id={nap.id}
                    created={nap.createdAt}
                    key={nap.id}
                    duration={nap.minutes}
                    note={nap.note}
                    size={"small"}
                    napRemount={napRemount}
                    setNapRemount={setNapRemount}
                  />
                );
              })}
            </>
          ) : (
            <p className="p-3 px-5 rounded-2xl text-sm bg-[color:var(--error-bg)] text-opacity-50">
              It&apos;s pretty quiet here. Add a nap in the{" "}
              <Link href="/home">home page</Link> to get started.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default NapList;
