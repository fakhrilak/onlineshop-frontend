import React,{useEffect,useState} from 'react'
import Button from './Button'
import Slider from '../../components/SliderActuator/SliderActuator'

const ActuatorPercobaan = () => {
 
   const datas = [
        {
            name: "AC 1",
            value : 1,
            type: "button"
        },
        {
            name: "AC 2",
            value : 0,
            type: "button"
        },
        {
            name: "AC 3",
            value : 120,
            type: "slider"
        }
    ]

    const typeView=(data)=>{
        if(data.type == "button"){
            return (<button className={`${controlColor(data)}`}>
            {data.name}</button>)
        }else {
            return <Slider/>
        }
    }

    const controlColor=(data)=>{
        if(data.value == 1){
            return "bg-blue-300"
        }else if(data.value == 0){
            return "bg-red-300"
        }
    }
    
    
    return (
     
     
        <>
        <h1>Application</h1>
        <p>The currently active users list:</p>
        <ul>
        {
          datas.map(function(data){
            return (
                <div>{typeView(data)}</div>
            )
          })
        }
        </ul>
      </>

      
    )
}

export default ActuatorPercobaan
