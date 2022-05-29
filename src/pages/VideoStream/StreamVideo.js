import React, { useEffect, useState, useRef } from 'react'
import DetailStream from './DetailStream'
import Modal from './Modal'
import { loadPlayer } from 'rtsp-relay/browser';
import { Socket, socketURL , streamURL} from '../../config/API';
import Sidebar from '../../components/Sidebar/Sidebar';
import FullVideo from '../../components/Modal/FullVideo';
import StreamVideoDashboard from "./StreamVideoDashboard.js";
const StreamVideo = () => {
        const ch1 = useRef(null);
        const ch2 = useRef(null);
        const ch3 = useRef(null);
        const ch4 = useRef(null);
        const ch5 = useRef(null);
        const ch6 = useRef(null);
        const ch7 = useRef(null);
        const [route,setRoute] = useState(["1","2","3","4","5","6","7"])
        const [show,setShow] = useState(false)
        const [ch,setCh] = useState(1)
        const datach = [{data:ch1},{data:ch2},{data:ch3},{data:ch4},{data:ch5},{data:ch6},{data:ch7}]
        useEffect(() => {
            if(ch1){
                loadPlayer({
                    url: `${streamURL}/api/stream/${route[0]}`,
                    canvas: ch1.current,
                  });
            }
            if(ch2){
                loadPlayer({
                    url: `${streamURL}/api/stream/${route[1]}`,
                    canvas: ch2.current,
                  });
            }
            if(ch3){
                loadPlayer({
                    url: `${streamURL}/api/stream/${route[2]}`,
                    canvas: ch3.current,
                  });
            }
            if(ch4){
                loadPlayer({
                    url: `${streamURL}/api/stream/${route[3]}`,
                    canvas: ch4.current,
                  });
            }
            if(ch5){
                loadPlayer({
                    url: `${streamURL}/api/stream/${route[4]}`,
                    canvas: ch5.current,
                  });
            }
            if(ch6){
                loadPlayer({
                    url: `${streamURL}/api/stream/${route[5]}`,
                    canvas: ch6.current,
                  });
            }if(ch7){
                loadPlayer({
                    url: `http://192.168.10.171:5000/api/stream/${route[6]}`,
                    canvas: ch7.current,
                  });
            }
            setTimeout(()=>{
                setRoute(["xxx","xxx","xxx","xxx","xxx","xxx","xxx"])
            },60000)
        }, [route]);

    const onset=(data)=>{
        setShow(!show)
        setCh(data)
    }
    return (
        <div>
        <div className="ml-10 w-9/12 pt-20 lg:ml-80 mb-20">
                <StreamVideoDashboard/>
        </div>
        <div className="ml-10 w-9/12 grid grid-cols-1 lg:grid-cols-3 gap-5 pt-20 lg:ml-80 mb-20">
            {datach.map((data,index)=>(
                <div key={index} className="w-full bg-green-300 rounded h-auto">
                    <div className="w-11/12 m-auto h-auto">
                        <canvas ref={data.data} 
                        className="rounded w-full mt-2"
                        />
                    </div>
                    <div className="w-11/12 m-auto">
                        <button className="w-20 bg-green-500 rounded text-center text-white mt-2 mb-2"
                        onClick={()=>onset(index+1)}
                        >Show</button>
                    </div>
                </div>
            ))}
        </div>
        {show && <FullVideo ch={ch} show={show} setShow={setShow}/>}
        </div>
    )
}

export default StreamVideo
