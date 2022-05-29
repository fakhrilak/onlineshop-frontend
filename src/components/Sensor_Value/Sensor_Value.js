import React, { useEffect, useState } from 'react'
import {Socket} from "../../config/API"
import CardSuhu from "../../components/card/Card_Suhu"
import {API,config} from "../../config/API"

const Sensor = () => {
    
    const [Sensor,setSensor]=useState([])
    const [message,setMessage] = useState("")

    useEffect(()=>{
        API.get("/sensor",config)
        .then((res)=>{
            setSensor(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        Socket.on("R.sensor",data=>{
            setSensor(data.value)
            setMessage(data.message)
        })
    },[Sensor,message])

    console.log(Sensor, "Sensor")

    return (
        <div className="h-200 bg-dark-300 w-100 grid grid-cols-3">
            {Sensor.length > 0 ? Sensor.map((data)=>(
                <>
                {console.log(data.value_sensor[0])}
                <CardSuhu
                name = {data.name_sensor}
                satuan = {data.satuan_sensor}
                value = {data.value_sensor[0].value_sensor}
                call = {data.call_sensor}
                id = {data._id}
                />
                </>
            )):<p>{message}</p>}
        </div>
    )
}

export default Sensor
