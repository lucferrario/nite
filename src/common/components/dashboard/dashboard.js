import React, { useState, useEffect } from "react";
import Header from "../header";
import InsightCard from "./insightcard";
import LineChart from "../charts/linechart";
import { chartData } from "../../../data/demodata";
import ProgressBar from "./progressbar";
import DonutChart from "../charts/donutchart";
import axios from "axios";

let width, height, gradient;

function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.left, 0, chartArea.right);
    gradient.addColorStop(0, "rgba(76, 223, 232, 1)");
    gradient.addColorStop(1, "rgba(121, 71, 247, 1)");
  }

  return gradient;
}

function getBackGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.left, 0, chartArea.right);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.1, "rgba(255, 255, 255, 0)");
  }

  return gradient;
}

function Dashboard({ active, setActive, qualityOpen, setQualityOpen }) {
  const [avgsleep, setAvgsleep] = useState(0);
  const [habitsRespected, setHabitsRespected] = useState(0);
  const [habitsRespectedAvg, setHabitsRespectedAvg] = useState(0);
  const [totalHabits, setTotalHabits] = useState(0);
  const [totsleep, setTotsleep] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);

  function setGraphData(userSleepData) {
    return {
      labels:
        userSleepData === undefined
          ? 0
          : userSleepData.map((item) => {
              let date = new Date(item.date);
              return date.getDate() + "/" + (date.getMonth() + 1);
            }),
      datasets: [
        {
          label: "Hours Slept",
          data:
            userSleepData === undefined
              ? 0
              : userSleepData.map((item) => parseFloat(item.hours)),
          borderColor: "rgba(25, 25, 25, 0.8)",
          borderWidth: 2,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              // This case happens on initial chart load
              return null;
            }
            return getBackGradient(ctx, chartArea);
          },
        },
      ],
    };
  }

  const AvgDailyHabitsMode = 1; // 0: average of daily % | 1: average of total habits

  function refresh() {
    axios
      .get("/api/sleep", {
        params: {
          filter: "month",
        },
      })
      .then((res) => {
        setUserData(setGraphData(res.data.filteredSleep));
        let data = res.data.filteredSleep.map((data) => parseFloat(data.hours));
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i];
        }
        setAvgsleep(Math.round((sum / data.length) * 10) / 10);
        setTotsleep(Math.round(sum * 10) / 10);
        setSleepQuality(
          res.data.filteredQualityAvg == null
            ? 0
            : Math.round(res.data.filteredQualityAvg * 10) / 10
        );
      });

    axios
      .get("/api/user", {
        params: {
          filter: "habitsRespected-month",
        },
      })
      .then((res) => {
        if (AvgDailyHabitsMode === 0) {
          let totHabitsRespected = 0;
          let totHabitsRespectedAvg = 0;
          res.data.habitsRespected.map((data) => {
            totHabitsRespected += data.quantity;
            totHabitsRespectedAvg += (data.quantity * 100) / data.dailyMax;
          });
          totHabitsRespectedAvg = Math.round(
            totHabitsRespectedAvg / res.data.habitsRespected.length
          );
          setHabitsRespected(totHabitsRespected);
          setHabitsRespectedAvg(
            totHabitsRespectedAvg ? totHabitsRespectedAvg : 0
          );
          setTotalHabits(res.data.habits ? res.data.habits.length : 0);
        } else if (AvgDailyHabitsMode === 1) {
          let totHabitsRespected = 0;
          let totHabitsMax = 0;
          res.data.habitsRespected.map((data) => {
            totHabitsRespected += data.quantity;
            totHabitsMax += data.dailyMax;
          });
          setHabitsRespected(totHabitsRespected);
          setTotalHabits(res.data.habits ? res.data.habits.length : 0);
          setHabitsRespectedAvg(
            Math.round((totHabitsRespected * 100) / totHabitsMax)
          );
        }
      });

    axios.get("/api/notes").then((res) => {
      setTotalNotes(
        res.data.withnotes._count.id ? res.data.withnotes._count.id : 0
      );
    });
  }

  const [userData, setUserData] = useState(setGraphData());

  const [userOptions, setUserOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.4,
    pointRadius: 0,
    fill: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          color: "rgba(0,0,0,0.5)",
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grace: "15%",
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          color: "rgba(0,0,0,0.5)",
        },
        grid: {
          display: true,
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
      },
    },
    elements: {
      line: {},
    },
  });

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "Inter";
        ctx.textBaseline = "top";
        var text = "Foo-bar",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  useEffect(() => {
    if (!qualityOpen) refresh();
    refresh();
  }, [qualityOpen]);

  return (
    <div className="w-full h-full min-h-full box-border overflow-y-scroll rounded-3xl pt-8 p-5 relative 2xl:p-8 pb-32 xl:pb-8">
      <Header active={active} setActive={setActive} />
      <div className="flex flex-col xl:flex-row">
        <div className="xl:w-1/2 xl:mr-8">
          <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
            30 Days performance
          </p>
          <div className="flex w-full overflow-x-scroll xl:grid xl:grid-cols-2 xl:gap-3">
            <InsightCard
              title={"Hours slept"}
              data={totsleep}
              img={"blue"}
              level={
                avgsleep === 0
                  ? null
                  : avgsleep >= 6 && avgsleep < 7.5
                  ? "Medium"
                  : avgsleep >= 7.5
                  ? "High"
                  : "Low"
              }
            />
            <InsightCard
              title={"Average sleep"}
              data={
                String(avgsleep).split(".")[1]
                  ? `${
                      isNaN(String(avgsleep).split(".")[0])
                        ? "0"
                        : String(avgsleep).split(".")[0]
                    }h ${
                      (isNaN(String(avgsleep).split(".")[1])
                        ? 0
                        : String(avgsleep).split(".")[1]) * 6
                    }min`
                  : `${
                      isNaN(String(avgsleep).split(".")[0])
                        ? "0"
                        : String(avgsleep).split(".")[0]
                    }h`
              }
              img={"red"}
              level={
                avgsleep === 0
                  ? null
                  : avgsleep >= 6 && avgsleep < 7.5
                  ? "Medium"
                  : avgsleep >= 7.5
                  ? "High"
                  : "Low"
              }
            />
            <InsightCard
              title={"Habits respected"}
              data={
                habitsRespected +
                " (" +
                (isNaN(habitsRespectedAvg) ? "0" : habitsRespectedAvg) +
                "%)"
              }
              img={"purple"}
              level={
                totalHabits === 0
                  ? null
                  : habitsRespectedAvg <= 35
                  ? "Low"
                  : habitsRespectedAvg > 35 && habitsRespectedAvg <= 75
                  ? "Medium"
                  : "High"
              }
            />
            <InsightCard
              title={"Notes taken"}
              data={totalNotes}
              img={"orange"}
              //level={"Low"}
            />
          </div>
        </div>
        <div className="xl:w-1/2 lg:flex xl:flex-col">
          <div className="flex flex-col lg:mr-8 xl:mr-0">
            <p className="font-semibold text-lg mt-8 mb-5 2xl:text-xl">
              Analytics
            </p>
            <div className="flex flex-col">
              <div className="bg-[color:var(--bg-panel)] flex box-border w-full justify-center items-center p-3 mr-8 rounded-2xl max-h-64 aspect-video">
                <LineChart
                  chartData={userData}
                  chartOptions={userOptions}
                  className="linechart"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg mb-5 mt-8 xl:text-xl">
              Sleep quality
            </p>
            <div className="bg-[color:var(--bg-panel)] flex flex-col h-full w-full p-4 rounded-2xl xl:w-1/3 2xl:w-1/3">
              <ProgressBar
                text={sleepQuality === 0 ? "-" : sleepQuality + "%"}
                progress={sleepQuality}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col"></div>
    </div>
  );
}

export default Dashboard;
