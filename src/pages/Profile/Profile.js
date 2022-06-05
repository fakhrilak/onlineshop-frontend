import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import { API, config,BaseURL } from '../../config/API'
import Modal from "../../components/Modal/Modal"
import { connect, useDispatch } from 'react-redux'
import FormAlamat from '../../components/Form/FormAlamat'
import {FaArrowAltCircleUp} from "react-icons/fa"
import CardTransaksi from '../../components/Card/CardTransaksi'
const Profile = ({auth:{users}}) => {
    const [data,setData] = useState({})
    const [kambing,setKambing] = useState([])
    const [handleEdit,setHandleEdit] = useState(false)
    const [triger,setTriger] = useState(false)
    const [message,setMessage] = useState("")
    const [username,setUsername] = useState("")
    const [fullname,setFullname] = useState("")
    const [alamat,setAlamat] = useState()
    const [add,setAdd] = useState(false)
    const [trigerAdd,setTrigerAdd] = useState(false)
    const history = useHistory()
    useEffect(()=>{
        API.get("/alamat",config)
        .then((res)=>{
            setAlamat(res.data.data)
        })
    },[trigerAdd])
    return users && alamat?(
        <div >
            <div className="md:ml-80 pt-10">
                    <div className="w-11/12 bg-green-600 rounded-xl m-auto bg-red-500"
                    style={{ 
                        backgroundImage: `url(${BaseURL+"/single/"+data.picture})` 
                    }}
                    >
                        <div className="w-9/12 m-auto">
                    <Modal
                    show={handleEdit} 
                    handleshow={setHandleEdit} 
                    heigh={"64"} 
                    width={"5/12"}
                    top={36}
                    >
                        <div className="w-11/12 m-auto">
                            <p className="text-white font-bold">EDIT PROFILE</p>
                            <p className="text-white">{message}</p>
                            <div className="w-full mt-3 rounded">
                                <input
                                className="w-full rounded font-black"
                                placeholder={data.fullname}
                                value={fullname}
                                onChange={(e)=>setFullname(e.target.value)}
                            />
                            </div>
                            <div className="w-full mt-3 rounded">
                                <input
                                className="w-full rounded font-black"
                                value={username}
                                placeholder={data.username}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                            </div>
                            <div className="w-full mt-3 rounded">
                                <input
                                className="w-full rounded font-black"
                                placeholder={data.email}
                            />
                            </div>
                            <div className="mt-2">
                                <button
                                className="bg-white w-20 font-bold rounded"
                                onClick={()=>{
                                    const data = {
                                        username : username,
                                        fullname : fullname
                                    }
                                    API.patch("/profile",data,config)
                                    .then((res)=>{
                                        setMessage(res.data.message)
                                        setTriger(!triger)
                                    })
                                    .catch((err)=>{
                                        setMessage(err.message)
                                    })
                                }}
                                >SIMPAN</button>
                            </div>
                            
                        </div>
                    </Modal>
                    </div>
                            <div className="float-right mt-2 mr-2">
                                <button
                                className="bg-white w-24 rounded font-bold"
                                onClick={()=>setHandleEdit(true)}
                                >Edit Profile</button>
                            </div>
                            <div className="float-left mt-2 ml-2">
                                <p className="text-white font-bold">{users.email}</p>
                            </div>
                            <div className="w-full">
                                <div className="w-40 h-40 m-auto pt-4">
                                    <img src={BaseURL+"/single/"+users.picture}
                                    className="w-40 h-40 rounded-full"
                                    />
                                </div>
                                <div className="w-full m-auto text-center pt-10 text-white">
                                    <p>{users.firstName}{" "}{users.lastName}</p>
                                    <p>{users.email}</p>
                                </div>
                                
                            </div>
                </div>
            </div>
            <div className='md:ml-80 pt-10'>
                <button className='font-bold w-20 bg-green-200 mb-2 rounded'
                onClick={()=>setAdd(!add)}
                >{add?"-":"+"}</button>
                {add && <FormAlamat trigerAdd={trigerAdd} setTrigerAdd={setTrigerAdd}/>}
                {alamat.map((data,index)=>(
                    <>
                    <div key={index}
                    className="bg-green-200 w-11/12 m-auto rounded gap-4 grid grid-cols-3 gap-4"
                    >
                        <div>
                            <div><p className='ml-2'>Provinsi : {data.province}</p></div>
                            <div><p className='ml-2'>Nama Kota : {data.city_name}</p></div>
                        </div>
                        <div>
                            <p className='ml-2'>Detail Alamat : {data.detailAlamat}</p>
                        </div>
                        
                    </div>
                    <div className='mt-2'/>
                    </>
                ))}
            </div>
        </div>
    ):null
}

const mapStateToProps = (state) => ({
    order: state.order,
    auth : state.auth
  });
  
  export default connect(mapStateToProps, {})(Profile);
