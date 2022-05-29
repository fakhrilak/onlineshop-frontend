import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { API, config } from '../../config/API'
import Modal from "../../components/Modal/Modal"
import SuplierLogo from "../../img/suplierLogo.png"
import { FaBeer,FaArrowCircleRight} from 'react-icons/fa';
import profile from "../../img/profile.png"
import awan from "../../img/awan.png"
import LandGreen from "../../img/land-Green.png"
const Suplier = () => {
    const [q,setQ] = useState(null)
    const [data,setData]= useState([])
    const [handleshow,setHandleShow] = useState(false)
    const [message,setMessage] = useState("")
    const [namapt,setNamaPT] = useState("")
    const [namauser,setNamaUser] = useState("")
    const [alamat,setAlamat] = useState("")
    const [phone,setPhone] = useState("")
    const [triger,setTriger] = useState(false)
    const [showdetail,setShowDetail] = useState(false)
    const [indexShow,setIndexShow] = useState(null)

    useEffect(()=>{
        API.get("/suplier",config)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[triger])

    const header=[
        "Nama PT", "Detail"
    ]
    return (
        <div>
            <div className="md:ml-80 pt-10">
                <div>
                    <img src={awan} className="w-20 lg:w-44"
                    onClick={()=>setHandleShow(true)}
                    />
                </div>
                <div className="mb-5"/>
                <Modal
                show={handleshow} 
                handleshow={setHandleShow} 
                heigh={"96"} 
                width={"5/12"}
                top={32}
                >
                    <div className="w-10/12 m-auto ">
                        <div className="mt-2">
                            <p className="font-bold text-green-500">FORM ADD SUPLIER</p>
                            <p className="text-white">{message}</p>
                        </div>
                        <div className="w-11/12 m-auto">
                            <img src={SuplierLogo}
                            className="w-28 m-auto"
                            />
                        </div>
                        <div  className="w-full mt-3 rounded">
                            <input
                        className="w-full rounded font-black text-center"
                        placeholder="nama pt"
                        value={namapt}
                        onChange={(e)=>setNamaPT(e.target.value)}
                        />
                        </div>
                        <div  className="w-full mt-3 rounded">
                          <input
                        className="w-full rounded font-black text-center"
                        placeholder="nama user"
                        value = {namauser}
                        onChange={(e)=>setNamaUser(e.target.value)}
                        />  
                        </div>
                        <div  className="w-full mt-3 rounded">
                           <input
                        className="w-full rounded font-black text-center"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        /> 
                        </div>
                        <div  className="w-full mt-3 rounded">
                           <input
                        className="w-full rounded font-black text-center"
                        placeholder="Alamat"
                        value={alamat}
                        onChange={(e)=>setAlamat(e.target.value)}
                        /> 
                        </div>
                        <div className="mt-4">
                            <button
                            className="w-44 rounded text-green-700 bg-gradient-to-r font-bold from-green-100 shadow-2xl to-green-700 border-2 border-green-700"
                            onClick={()=>{
                                const data = {
                                    "name_suplier" : namauser,
                                    "name_PT" : namapt,
                                    "alamat" : alamat,
                                    "cp" : phone
                                }
                                API.post("/suplier",data,config)
                                .then((res)=>{
                                    setMessage(res.data.message)
                                    setTimeout(()=>{
                                        setMessage("")
                                        setTriger(!triger)
                                    },2000)
                                    
                                })
                                .catch((err)=>{
                                    setMessage(err)
                                })
                            }}
                            >SUBMIT</button>
                        </div>  
                    </div>
                </Modal>
                <table className="w-11/12 table-auto m-auto ">
                    <thead>
                            <tr className=" bg-gradient-to-r from-green-100 to-green-700 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center rounded-tl-lg"
                                    >Nama PT</th>
                                    <th className="py-3 px-6 text-center rounded-tr-lg"
                                    >Detail</th>
                            </tr>
                    </thead>
                    <tbody className="text-emerald-700 text-sm font-light m-auto">
                            {data.length > 0 ? data.map((data,index)=>(
                                <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100 hover:text-green-700 text-lg font-bold">
                                    <td
                                    className="py-3 px-6 text-left whitespace-nowrap text-center w-3/12 text-sm"
                                    >{data.name_PT}</td>
                                    <td
                                    className="py-3 px-6 text-center whitespace-nowrap text-center w-5"
                                    ><FaArrowCircleRight
                                    className="text-center w-full"
                                    onClick={()=>{
                                        setShowDetail(true)
                                        setIndexShow(index)
                                    }}
                                    /></td>
                                </tr>
                            )):<p>Loading...</p>}
                    </tbody>
                </table>
                {indexShow !== null ? <div>
                    <Modal
                    show={showdetail} 
                    handleshow={setShowDetail} 
                    heigh={"96"} 
                    width={"5/12"}
                    top={32}
                    >
                        <div>
                            <div>
                                <img src={profile}
                                className="w-44"
                                />
                            </div>
                            <div className="grid grid-cols-6 w-11/12 m-auto">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Nama PT</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p>{data[indexShow].name_PT}</p>
                                    </div>
                            </div>
                            <div className="grid grid-cols-6 w-11/12 m-auto pt-2">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Nama</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p>{data[indexShow].name_suplier}</p>
                                    </div>
                            </div>
                            <div className="grid grid-cols-6 w-11/12 m-auto pt-2">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Phone</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p>{data[indexShow].cp}</p>
                                    </div>
                            </div>
                            <div className="grid grid-cols-6 w-11/12 m-auto pt-2">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Alamat</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p>{data[indexShow].alamat}</p>
                                    </div>
                            </div>
                        </div>
                    </Modal>
                </div>:null}
                <div className="w-11/12 m-auto">
                    <div className="">
                        <button className="w-12/12 text-white font-bold rounded float-right"
                        ><img src={LandGreen}/></button>
                    </div>                   
                </div>
            </div>
            
        </div>
    )
}

export default Suplier
