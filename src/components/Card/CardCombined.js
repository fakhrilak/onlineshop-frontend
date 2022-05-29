import React, { useState } from "react";
import CardSensor from "./CardSensor";
import CardActuator from "./CardActuator";

export default function CardCombined() {
  const [active, setActive] = useState("CardSensor");
  return (
    <div className="relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded bg-white overflow-hidden">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <button className="font-semibold text-lg text-blueGray-700 border-1 border-gray-400 rounded mr-2 p-1"
                    type="button"
                    onClick={() => setActive("CardSensor")}>
              Sensor
            </button>
            <button className="font-semibold text-lg text-blueGray-700 border-1 border-gray-400 rounded p-1"
                    type="button"
                    onClick={() => setActive("CardActuator")}
>
              Actuator
            </button>
          </div>
        </div>
      </div>
      {active === "CardSensor" && <CardSensor/>}
      {active === "CardActuator" && <CardActuator/>}

    </div>
  );
}
