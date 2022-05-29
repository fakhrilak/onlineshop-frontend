import React,{useEffect,useRef} from 'react'
import { loadPlayer } from 'rtsp-relay/browser';
import { streamURL } from '../../config/API';
const FullVideo = (props) => {
    const ch1 = useRef(null);
    const {ch,show,setShow} = props
    useEffect(()=>{
        if(ch1){
            loadPlayer({
                url: `${streamURL}/api/stream/${ch}`,
                canvas: ch1.current,
                });
            }
    },[])
    return show ? (
        <div className="fixed top-48 lg:top-0 w-screen z-50 h-80">
            <div className="w-full lg:w-10/12  m-auto"
            onDoubleClick={()=>setShow(false)}
            >
                <canvas ref={ch1} 
                    className="rounded w-full mt-2"
                />
            </div>
            
        </div>
    ):null
}

export default FullVideo
