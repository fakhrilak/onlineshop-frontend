import React, { useState } from "react";
import Add_actuator from "./Add_actuator";
import Add_Sensor from "./Add_sensor";
import Navbar from "../../components/Navbar/Navbar";
import "./index.css";

const Form_Add = () => {
  const [handleForm, setHandleForm] = useState(false);
  
  return (
    <div className="h-full md:ml-64 mt-20">
      <div className="menu-button">
        <button
          className="button border-1 border-white bg-green-500"
          onClick={() => setHandleForm(true)}
        >
          Add Sensor
        </button>

        <button
          className="button border-1 border-white"
          onClick={() => setHandleForm(false)}
        >
          Add Actuator
        </button>
      </div>
      <div className="container-adding-sensor-actuator">
        {handleForm ? (
          <div>
            <Add_Sensor />
          </div>
        ) : null}
        {!handleForm ? (
          <div>
            <Add_actuator />
          </div>
        ) : null}
      </div>
      
    </div>
    
  );
};

export default Form_Add;
