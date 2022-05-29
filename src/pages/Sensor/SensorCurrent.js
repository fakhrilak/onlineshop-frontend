import React, { useEffect, useState } from 'react'
import {Socket} from "../../config/API"
import CardSuhu from "../../components/Card/Card_Suhu"
import {API,config} from "../../config/API"
import CardBarChart from "../../components/Card/CardBarChart"
import { connect } from 'react-redux'

const SensorCurrent = ({auth}) => {
    const {users} = auth
    const [Sensor,setSensor]=useState([])
    const [message,setMessage] = useState("")
    const [triger,setTriger] = useState(false)
    useEffect(()=>{
        API.get("/sensor?value=now",config)
        .then((res)=>{
            setSensor(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        if(users){
           Socket.on("R.sensor"+users._id,data=>{
            setSensor(data.value)
            setMessage(data.message)
        }) 
        }
        
    },[])
    useEffect(()=>{
        Socket.on("R.realTime",data=>{
            setSensor(data.value)
        })
    },[])
    return (
        <div>
            
            {Sensor.length > 0 ? Sensor.map((data,index)=>(
                <div key={index}
                >
                <CardBarChart
                name = {data.name_sensor}
                satuan = {data.satuan_sensor}
                value = {data.value_sensor[0].value_sensor}
                call = {data.call_sensor}
                id = {data._id}
                />
                </div>
            )):<p>{message}</p>}

        </div>

    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
  })
  
export default connect(mapStateToProps, {}) (SensorCurrent)