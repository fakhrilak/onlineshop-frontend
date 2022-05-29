import React, { useEffect, useState, useRef } from 'react'
import DetailStream from './DetailStream'
import Modal from './Modal'
import { loadPlayer } from 'rtsp-relay/browser';
import { API, config, socketURL, streamURL } from '../../config/API';

const StreamVideo = () => {
        const ch1 = useRef(null);
        const [show,setShow] = useState(true)
        const [message,setMessage] = useState("")
        const [style,setStayle] = useState("")
        useEffect(() => {
            if(ch1){
                loadPlayer({
                    url: `${streamURL}/api/stream/swing`,
                    canvas: ch1.current,
                  });
            }
        }, []);
        
        const controll=(x,y,z,s)=>{
            setShow(false)
            const body ={
                x : x,
                y : y,
                z : z,
                s : s
            }
            API.post("/cam",body,config)
            .then((res)=>{
                setMessage(res.data.message)
                setShow(true)
                setStayle("m-2 text-green-500")
                setTimeout(()=>{
                    setMessage("")
                },2000)
            })
            .catch((err)=>{
                setMessage(err.message)
                setShow(true)
                setStayle("m-2 text-red-500")
                setTimeout(()=>{
                    setMessage("")
                },2000)
            })
        }
    return (
        <div className="w-12/12 m-auto">
            <div>
                <canvas ref={ch1} 
                className="w-full rounded"
                />
            </div>
            <div className="mt-2 border-2 border-blue-500 rounded">
                <p className="m-2">Controll CCTV</p>
                <p className={style}>{message}</p>
                {show ?
                <div className="grid grid-cols-4 text-white">
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0,-0.2,0,0)}
                    >Buttom</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0,0.2,0,0)}
                    >Top</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0.2,0,0,0)}
                    >Right</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(-0.2,0,0,0)}
                    >Left</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0,0,1.0,0)}
                    >Z in</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0,0,-1.0,0)}
                    >Z out</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0.001,0,0,1)}
                    >Swing R</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(-0.001,0,0,1)}
                    >Swing L</button>
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controll(0,0,0,0)}
                    >Stop</button>
                </div>:<p className="m-2">wait request</p>}
                
            </div>
            {/* <div className="mt-2 border-2 border-blue-500 rounded">
                <p className="m-2">Controll CCTV SOCKET</p>
                <div className="grid grid-cols-4 text-white">
                    <button className="m-1 bg-blue-500 w-14 h-10 lg:w-44 rounded"
                    onClick={()=>controlSock()}
                    >Buttom</button>
                </div>
            </div> */}
        </div>
    )
}

export default StreamVideo
