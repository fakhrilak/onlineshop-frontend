import React, { useEffect, useState } from 'react'
import {API,config} from "../../config/API"
import './index.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Add_sensor = () => {
    const [name,setName] = useState("")
    const [call,setCall] = useState("")
    const [satuan,setSatuan] = useState("")
    const [allSatuan,setAllSatuan] = useState([])
    const [controller,setController] = useState(false)
    const [nameSatuan,setNameSatuan] = useState("")
    const [singkatan,setSingkatan] = useState("")
    const [triger,setTriger] = useState(false)

    useEffect(()=>{
        API.get("/satuan",config)
        .then((res)=>{
            setAllSatuan(res.data.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[triger])
    const onSubmit=()=>{
        const data = {
            "name_sensor" : name,
            "call_sensor" : call,
            "satuan_sensor": satuan,
            "value_sensor" : 0
        }
        API.post("/sensor",data,config)
        .then((res)=>{
            console.log(res.data.value)
            alert(res.data.message)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const AddSatuanSensor=()=>{
        const data = {
            "name": nameSatuan,
            "singkatan": singkatan
        }
        API.post("/satuan",data,config)
        .then((res)=>{
            alert(res.data.message)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    return (
        <div>
        <div className="adding-sensor-actuator px-5 py-3">
            <div className="mb-3">
                    <button
                    className="mt-6 float-center mb-4 bg-green-500 border-1 border-white w-44 h-10 rounded text-white "
                    onClick={()=>setController(!controller)}
                    >
                        {controller ? "MENU SENSOR":"MENU SATUAN"}
                    </button>
                </div>
            {!controller &&
            <>
                <div>
                    <input
                    className="w-full h-10 rounded"
                    placeholder="Nama Sensor"
                    value= {name}
                    onChange={(e)=>setName(e.target.value)}
                    />              
                </div>
                <div>
                    <input
                    className="w-full h-10 rounded mt-10"
                    placeholder="Call Neme sensor"
                    value= {call}
                    onChange = {(e)=>setCall(e.target.value)}
                    /> 
                </div>
                <div>
                    <select
                    onChange={(e)=>setSatuan(e.target.value)}
                    className="w-full h-10 rounded mt-10"
                    >
                        
                        {allSatuan.map((data)=>(
                            <option value= {data.singkatan}>{data.singkatan}</option>
                        ))}
                    </select>
                </div>
                <div>
    
                       <button
                        className="button-component"
                        onClick = {()=>onSubmit()}
                        >ADD SENSOR</button>
                </div>
            </>}

            {controller &&
            <div
            className="w-full m-auto pt-10"
            >
                <div
                className="mt-2"
                >
                    <div
                    className="w-full"
                    >
                        <input
                        placeholder="NAME SATUAN"
                        className="w-full h-10 rounded mt-10"
                        value={nameSatuan}
                        onChange={(e)=>setNameSatuan(e.target.value)}
                        />
                    </div>
                    <div
                    className="w-full"
                    >
                        <input
                        placeholder="NAME SINGKATAN"
                        className="w-full h-10 rounded mt-10"
                        onChange={(e)=>setSingkatan(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                        className="button-component"
                        onClick={()=>AddSatuanSensor()}
                        >
                                ADD SATUAN
                        </button>
                    </div>
                </div>
            </div>}
        </div>
        </div>
    )
}

export default Add_sensor
