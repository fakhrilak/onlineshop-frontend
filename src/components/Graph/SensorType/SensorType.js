import React, { useState, useEffect } from "react";
import { Socket } from "../../../config/API";
import { Line } from "react-chartjs-2";

import { API, config } from "../../../config/API";
import dayjs from "dayjs";
import "./SensorType.css";

const SensorType = () => {
  const [Sensor, setSensor] = useState([]);
  const [message, setMessage] = useState("");
  const [chartData, setChartData] = useState([]);
  const [value,setValue] = useState("a")

  useEffect(() => {
    API.get("/sensor?value="+value, config)
      .then((res) => {
        setChartData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  useEffect(() => {
    Socket.on("R.sensor", (data) => {
      setSensor(data.value);
      setMessage(data.message);
    });
  }, [Sensor, message]);

  const test = (data, call) => {
    let time = [];
    let value = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data, "consolecoba");
      time.push(dayjs(data[i].time).format("DD"));
      value.push(data[i].value_sensor);
    }
    return {
      labels: time,
      datasets: [
        {
          label: call,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderWidth: 3,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          data: value,
        },
      ],
    };
  };

const dataquery = [
  {name:"30 Menit terahir", value : "a"},
  {name:"1 Jam terahir", value : "b"},
  {name: "3 Jam terahir", value : "c"},
  {name: "12 Jam terahir", value : "d"},
  {name: "24 Jam terahir", value : "e"},
  {name: "7 Hari terahir", value : "f"},
  {name: "1 Bulan terahir", value : "g"},
  {name: "2 Bulan terahir", value : "h"},
]
const stayl = (data)=>{
  if(data == value){
    return "underline text-green-700 cursor-pointer"
  }else{
    return "underline cursor-pointer"
  }
}
  return (
    <div>
      <div className="w-10/12 grid grid-cols-4 gap-5 m-auto pb-10">
         {dataquery.map((data,index)=>(
            <div key={index} >
              <p className={stayl(data.value)}
              onClick={()=>setValue(data.value)}
              >{data.name}</p>
            </div>
         ))}
      </div>
      {chartData.map((item, index) => (
        <div className="relative flex flex-col min-w-0 break-words bg-white h-80 rounded mb-6 xl:mb-8 shadow-md">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                {/* <h6 className="uppercase text-emerald-700 mb-1 text-xs font-semibold">
                  O
                </h6> */}
                <h2 className="bg-white text-xl font-semibold text-black">
                  Sensor {item.name_sensor}
                </h2>
              </div>
            </div>
          </div>
          <div className="px-4 flex-auto">
            <div className="relative h-400 pb-0">
              <Line
                data={test(item.value_sensor, item.call_sensor)}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  // title: {
                  //   text: "Sensor Value",
                  //   display: false,
                  // },
                  pointRadius: 0,
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                      },
                    },
                  },
                  legend: {
                    label: {
                      fontColor: "#2e8080",
                    },
                    align: "end",
                    position: "bottom",
                  },
                  tooltips: {
                    mode: "index",
                    intersect: false,
                  },
                  lineHeightAnnotation: {
                    always: true,
                    hover: false,
                    lineWeight: 1.5,
                  },
                  animation: {
                    duration: 2000,
                  },
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          autoSkip: true,
                          maxTicksLimit: 10,
                          beginAtZero: true,
                        },
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    xAxes: [
                      {
                        type: "time",
                        distribution: "linear",
                        // gridLines: {
                        //   display: false,
                        // },
                      },
                    ],
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-5 mt-5">
                <div>
                  <p>max <strong>{item.max}</strong></p>
                </div>
                <div>
                  <p>min <strong>{item.min}</strong></p>
                </div>
                <div>
                  <p>average <strong>{item.average}</strong></p>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SensorType;
