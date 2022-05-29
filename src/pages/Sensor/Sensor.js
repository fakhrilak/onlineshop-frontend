import React, { useEffect, useState } from 'react'
import {Socket} from "../../config/API"
import CardSuhu from "../../components/Card/Card_Suhu"
import {API,config} from "../../config/API"
import Sidebar from '../../components/Sidebar/Sidebar'
import { connect } from 'react-redux'
import SensorCurrent from './SensorCurrent'
import kambing from "../../img/kambing-kanan.png"
import awan from "../../img/awan.png"
const Sensor = ({login}) => {
    const {users,role} = login
    const [Sensor,setSensor]=useState([])
    const [message,setMessage] = useState("")

    useEffect(()=>{
        if(role == "1"){
            API.get("/sensor?value=a",config)
        .then((res)=>{
            setSensor(res.data.data)
            console.log(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        }
        
    },[role])

 
    useEffect(()=>{
        Socket.on("R.sensor",data=>{
            setSensor(data.value)
            setMessage(data.message)
        })
    },[Sensor,message])

    return role ? (
        <div>
               <div className="mt-11 lg:ml-80 grid grid-cols-1 lg:grid-cols-3 items-center gap-20 mx-10 h-40">
            {Sensor.length > 0 ? 
            Sensor.map((data,index)=>(
                <>
                <div key={index}
                className="border-2 border-emerald-700 font-semibold rounded-xl items-center p-4"
                >
                <div>
                    <img src={awan}
                    className="w-44 m-auto"
                    />
                </div>
                <h6 className="uppercase font-semibold text-xs text-center mb-3">{data.call_sensor}</h6>
                  <h2 className="font-bold text-center mb-3">{data.name_sensor}</h2>
                  <div className="text-center">{data.satuan_sensor}</div>
                  <div className="text-center">{data.value_sensor[0].value_sensor}</div>
                  <div className="text-center text-xs text-gray-400 pt-4">{data._id}</div>
                  <div className="mt-5">
                    <img src={kambing}
                    className="w-20 float-left"
                    />
                    </div>
                </div>
                
                </>
            )):<h4 className="font-bold text-emerald-700">Data belum tersedia</h4>}

        </div>
        </div>

    ): null
}

const mapStateToProps = (state) => ({
    login: state.auth
  })
  
export default connect(mapStateToProps, {}) (Sensor)
  
