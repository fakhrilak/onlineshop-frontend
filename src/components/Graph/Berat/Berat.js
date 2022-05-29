import React, { useState, useEffect } from "react";
import { Socket } from "../../../config/API";
import { Line } from "react-chartjs-2";
import { API, config } from "../../../config/API";
import dayjs from "dayjs";

const Berat = () => {
  const [Sensor, setSensor] = useState([]);
  const [message, setMessage] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    API.get("/sensor", config)
      .then((res) => {
        setChartData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Socket.on("R.sensor", (data) => {
      setSensor(data.value);
      setMessage(data.message);
    });
  }, [Sensor, message]);

  console.log(chartData, "chart")
 
const test=(data,call)=>{
  let time = []
  let value = []
  for(let i = 0;i<data.length;i++){
    console.log(data, "consolecoba")
    time.push(dayjs(data[i].time).format("DD"))
    value.push(data[i].value_sensor)
  }
  console.log(time,"ini time")
  return({
    labels: time,
    datasets: [
      {
        label: call,
        backgroundColor: ["rgba(5, 192, 192, 0.6"],
        borderWidth: 1,
        data: value
      }
    ]
  })
}
  return (
    <div>
        
    {chartData.map((item,index)=>(
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-8 shadow-lg">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div className="flex flex-wrap items-center">
      <div className="relative w-full max-w-full flex-grow flex-1">
 <h6 className="uppercase text-emerald-700 mb-1 text-xs font-semibold">O</h6>
 <h2 className="bg-white text-xl font-semibold text-black">Sensor</h2>
      </div>
       </div>
       </div>
       <div className="p-4 flex-auto">
       <div className="relative h-350-px">      
      
       <Line
          data={test(item.value_sensor,item.call_sensor)}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            title: { 
              text: "Sensor Value", 
              display: true,
              fontColor: "black", 
            },
            legend: {
              labels: {
                fontColor: "black",
              },
              align: "end",
              position: "bottom"
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        

        />  
      </div>
      </div>
      </div>
        
    ))}  
    </div>
  );
        }

export default Berat
