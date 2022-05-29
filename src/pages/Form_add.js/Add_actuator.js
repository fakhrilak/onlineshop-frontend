import React,{useState} from 'react'
import {API,config} from "../../config/API"
import Sidebar from "../../components/Sidebar/Sidebar"

const Add_actuator = () => {
    const [name,setName] = useState("")
    const [call,setCall] = useState("")
    const [satuan,setSatuan] = useState("")
    const [type, setType] = useState("Button")
    console.log(type, "type")
    const onSubmit=()=>{
        const data = {
            "name_actuator" : name,
            "call_actuator" : call,
            "type_actuator": type,
            "value_actuator" : 0
        }
    
        API.post("/actuator",data,config)
        .then((res)=>{
        console.log(res.data.value)
        alert(res.data.message)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div>
        <div className="adding-sensor-actuator px-5">
            <div>
                <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full h-10 rounded mt-10"
                placeholder="Nama Actuator"
                />              
            </div>
            <div>
                <input
                type="text"
                value={call}
                onChange={(e)=>setCall(e.target.value)}
                className="w-full h-10 rounded mt-10"
                placeholder="Call Neme Actuator"
                /> 
            </div>
            <div>
                <select
                value={type}
                onChange={(e)=>setType(e.target.value)}
                className="w-full h-10 rounded mt-10"
                >
                    <option value={"Button"}>BOLEAN</option>
                    <option value={"PWM"}>PWM</option>    
                </select>
            </div>
            <div>
                <button
                className="button-component"
                onClick={()=>onSubmit()}
                >ADD ACTUATOR</button>
            </div>
        
        </div>
        </div>
        
    )
}

export default Add_actuator
