import React, {useState, useEffect} from 'react'
import { API, config, Socket } from '../../config/API'
import Slider from '../../components/SliderActuator/SliderActuator'
import Sidebar from '../../components/Sidebar/Sidebar'
import ToggleButton from '../../components/ToggleButton/ToggleButton'
import line from "../../img/lineee.png"
const Actuator = (props) => {
    const [Actuator, setActuator] = useState([])
    const [message, setMessage] = useState(false)
  

    useEffect(() => {
        API.get("/actuator", config)
        .then((res)=> {
            setActuator(res.data.data)
        
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [message])
   

    const typeView=(data)=>{
        if(data.type_actuator == "Button"){
            return (
                <div className="h-44">
                    <div className="text-xl text-white">{data.name_actuator}</div>
                    <div className="text-xs text-white">{data.call_actuator}</div>
                        <div className="p-2 px-4 text-white font-semibold rounded items-center text-center mt-10">
                            <ToggleButton
                            data = {data}
                            />
                    </div>
                </div>)
        }else {
            return (
                <div className="h-44">
                    <div className="text-xl text-white">{data.name_actuator}</div>
                    <div className="text-xs text-white">{data.call_actuator}</div>
                        <div className="p-2 px-4 text-white font-semibold rounded items-center text-center mt-10">
                            <Slider
                            data = {data}
                            />
                    </div>
                </div>)
        }
    }

  
    return (
        
        <div className="pb-5">
        <div className="mt-11 lg:ml-80 grid grid-cols-1 lg:grid-cols-3 items-center gap-20 mx-10 h-40">
            {Actuator.length > 0 ?
                (Actuator.map((data)=>(
                    <>
                    <div className="border-1 border-emerald-700 rounded-xl items-center p-4 w-12/12 bg-gradient-to-b from-green-100 shadow-2xl to-green-700">
                    <div>
                        <img src={line}
                        className="w-full"
                        />
                    </div>
                    {typeView(data)}
                    </div>
                    </>
                ))):<h4 className="font-bold text-emerald-700">Data belum tersedia</h4>
            }
        </div>
        </div>
    )
}

export default Actuator
