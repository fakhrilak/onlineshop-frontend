import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { API, config } from '../../config/API'
import { useMediaQuery } from 'react-responsive'
import Modal from "../../components/Modal/Modal"
import awan from "../../img/awan.png"
import LandGreen from "../../img/Land-Brown.png"
import klas from "../../img/klas.png"
import { useDispatch } from 'react-redux'
const AddClass = ({location}) => {
    const [data,setDate] = useState([])
    const [add,setAdd] = useState(false)
    const [triger,setTriger] = useState(false)
    const [message,setMessage] = useState("")
    const [name,setName] = useState("")
    const [kelas,setKelas] = useState("")
    const [harga,setHarga] = useState("")
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({
        type:"UPDATE_ROUTE",
        payload : location.pathname
        })
    },[])
    useEffect(()=>{
        API.get("/class",config)
        .then((res)=>{
          setDate(res.data.data)  
        })
        .catch((err)=>{
            alert(err)
        })
    },[triger])
    const header = [
        "NAME","KELAS", "HARGA"
    ]
    const isPortrait = useMediaQuery({ query: '(max-width: 667px)' })
    return(
        <div>
            <div className="h-full md:ml-80 pt-10 w-full lg:w-8/12">
                <div className="w-11/12 m-auto pb-10">
                    <img src={awan} className="w-20 lg:w-44"
                        onClick={()=>setAdd(!add)}
                    />
                </div>
                <div className="w-11/12 m-auto">
                {data.length > 0 ?
                        (<table className="w-full table-auto">
                            <thead>
                                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th class="py-3 px-6 text-center rounded-tl-lg"
                                        >NAME</th>
                                        <th class="py-3 px-6 text-center"
                                        >KELAS</th>
                                        <th class="py-3 px-6 text-center rounded-tr-lg"
                                        >HARGA</th>
                                    </tr>
                            </thead>
                            <tbody class="text-emerald-700 text-sm font-light">
                            
                                    {data.map((data,index)=>(
                                        <tr
                                        key={index}
                                        class="border-b border-gray-200 hover:bg-gray-100 hover:text-green-700 text-xs lg:text-lg font-bold">
                                            <td
                                            class="py-3 px-3 lg:px-6 text-left whitespace-nowrap text-center"
                                            >{data.name}</td>
                                            <td
                                            class="py-3 px-3 lg:px-6 text-left whitespace-nowrap text-center"
                                            >{data.kelas}</td>
                                            <td
                                            class="py-3 px-3 lg:px-6 text-left whitespace-nowrap text-center"
                                            >{data.harga}</td>
                                        </tr>
                                    ))}
                                
                        
                            </tbody>
                        </table>): 
                        (<div>
                            <br></br>
                                <h4 className="font-bold">Data belum tersedia</h4>
                        </div>)
                        }
                </div>
                <div className="w-full m-auto">
                    <div className="">
                        <button className="w-12/12 text-white font-bold rounded float-right"
                        ><img src={LandGreen}/></button>
                    </div>                   
                </div>
            </div>
            <Modal
            show={add} 
            handleshow={setAdd} 
            heigh={"5/6"} 
            width={"5/12"}
            >
                <div className="w-11/12 m-auto pt-4">
                    <div>
                        <img src={klas}
                        className="w-20"
                        />
                    </div>
                    <div className="w-full text-white text-center">
                        {message == "" ?null:<p>{message}</p>}
                    </div>
                    <div 
                    className="w-10/12 lg:w-8/12 m-auto pt-3"
                    >
                        <input
                        placeholder = "Name"
                        className="w-full m-auto rounded"
                        value= {name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div 
                    className="w-10/12 lg:w-8/12 m-auto pt-3 grid grid-cols-2 gap-2"
                    >
                        <input
                        placeholder = "Kelas"
                        className="w-full m-auto rounded"
                        value={kelas}
                        onChange={(e)=>setKelas(e.target.value)}
                        />
                        <input
                        placeholder = "Harga"
                        value={harga}
                        className="w-full m-auto rounded"
                        onChange={(e)=>setHarga(e.target.value)}
                        />
                    </div>
                    <div 
                    className="w-10/12 lg:w-8/12 m-auto pt-3 text-right"
                    >
                        <button
                        className="w-3/12 bg-white rounded font-medium"
                        onClick={()=>{
                            const newData = {
                                name:name,
                                kelas:kelas,
                                harga:harga
                            }
                            API.post("/class",newData,config)
                            .then((res)=>{
                                if(res.data.status == 200){
                                    setMessage(res.data.message)
                                    setTimeout(()=>{
                                        setMessage("")
                                        setTriger(!triger)
                                    },3000)
                                }else{
                                    setMessage(res.data.message)
                                    setTimeout(()=>{
                                        setMessage("")
                                    },3000)
                                }
                            })
                            .catch((err)=>{
                                alert(err)
                            })
                        }}
                        >ADD</button>
                        <div className="w-full absolute buttom-0 left-0">
                            <img src={LandGreen}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddClass
