import React, { useEffect, useState } from 'react'
import { API, config,BaseURL } from '../../config/API'
import Sidebar from '../../components/Sidebar/Sidebar'
import { connect, useDispatch } from 'react-redux'
import Modal from "../../components/Modal/Modal"
import { useHistory } from 'react-router'
import Goat from "../../img/Goat.png"
import IconTransaksi from "../../img/icon_transact.png"
import KambingBrown from "../../img/Land-Brown.png"
import { FaBeer,FaArrowDown} from 'react-icons/fa';
const Transaksi = ({auth}) => {
    
    const [transaksi,setTransaksi] = useState([])
    const [status,setStatus] = useState("")
    const [triger,setTriger] = useState(false)
    const [show,setShow] = useState(false)
    const [Message,setMessage] = useState("")
    const [newIndex,setNewIndex] = useState(null)
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const [query,setQuery] = useState(null)
    const [handleShowBuktiTF,setHandleShowBuktiTF] = useState(false)
    const [buktitfId,setBuktitfID] = useState(null)
    const [handleShowDetailOrders,setHandleShowDetailOrders] = useState(false)
    const [detailOrderId,setDetailOrdersId] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch({
    //     type:"UPDATE_ROUTE",
    //     payload : location.pathname
    //     })
    // },[])
    useEffect(()=>{
        API.get("/transaksi?page=0",config)
        .then((res)=>{
            setTransaksi(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[triger])
    const warna=(data)=>{
        if(data == "Pending"){
            return "text-yellow-400"
        }else if(data == "Accepted"){
            return "text-green-600"
        }else if(data == "Rejected"){
            return "text-red-600"
        }
    }
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
      useEffect(()=>{
        if(query!==null){
           API.get("/transaksi?page=0&status="+query,config)
            .then((res)=>{
                setTransaksi(res.data.data)
                console.log(res.data.data)
            })
            .catch((err)=>{
                console.log(err)
            }) 
        }
      },[query])
      
    return (
        <div>
            <div className="md:ml-80 pt-10"
            >
                    <div className="w-11/12 m-auto grid grid-cols-4 gap-2 text-center bg-gray-300 rounded-lg font-bold">
                        <div className="border-r-2 border-black"
                        onClick={()=>setQuery("")}
                        >
                            <p className="cursor-pointer">All</p>
                        </div>
                        <div className="border-r-2 border-black"
                        onClick={()=>setQuery("Accepted")}
                        >
                            <p className="cursor-pointer">Accepted</p>
                        </div>
                        <div className="border-r-2 border-black"
                        onClick={()=>setQuery("Pending")}
                        >
                            <p className="cursor-pointer">Pending</p>
                        </div>
                        <div className=""
                        onClick={()=>setQuery("Rejected")}
                        >
                            <p className="cursor-pointer">Rejected</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto">
                        <div className="w-44 bg-gray-300 mt-2 text-center rounded-lg">
                            Transaksi count : <strong>{transaksi.length}</strong>
                        </div>
                    </div>

                    <div className="mb-5"/>
                <div className="w-11/12 m-auto grid grid-cols-1 gap-2 lg:grid-cols-3 pb-5"
                >
                    
                    {transaksi.map((data,index)=>(
                        <div
                        key={index}
                        className ="bg-gradient-to-b from-green-100 to-green-700 rounded-lg pb-2 mt-2 shadow-2xl"
                        >   
                            <>
                            <div className="bg-gray-300 h-10 rounded-t">
                                <img src={IconTransaksi}
                                className="w-10 pl-2 pt-2"
                                />
                            </div>
                            <div className="w-full text-center mt-2 mb-2">
                                <p className="font-bold text-yellow-500">{data._id}</p>
                            </div>
                            <div className="m-auto pt-2 text-xs lg:text-base w-11/12">
                                <div className="mt-2 grid grid-cols-6">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Status</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p className={warna(data.status)}>{data.status}</p>
                                    </div>
                                        
                                        {/* <p className="font-semibold ml-2">Harga : {data.totBayar}</p> */}
                                </div>
                                {/* <div className="mt-2 grid grid-cols-6">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Transaksi Id</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p className="overflow-ellipsis overflow-hidden ml-2">{data._id}</p>
                                    </div>
                                </div> */}
                                <div className="mt-2 grid grid-cols-6">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Email</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p>{data.userId.email}</p>
                                    </div>
                                        
                                        {/* <p className="font-semibold ml-2">Harga : {data.totBayar}</p> */}
                                </div>
                                <div className="mt-2 grid grid-cols-6">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">User Name</p>
                                    </div>
                                    <div className="rounded-tl-lg text-sm font-bold col-span-4 rounded-br-lg bg-green-500 text-right pr-2">
                                        <p>{data.userId.username}</p>
                                    </div>
                                        
                                        {/* <p className="font-semibold ml-2">Harga : {data.totBayar}</p> */}
                                </div>
                                {data.status == "Pending" && auth.role == "1" && data.img !== "" &&
                                <div className="rounded grid grid-cols-6 gap-2 mt-2">
                                    <div className="col-span-2">
                                        <select
                                        className="bg-transparent"
                                        onChange={(e)=>setStatus(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                    <div className="text-center rounded col-span-4">
                                        <button
                                        className="w-full rounded-tl-lg rounded-br-lg bg-green-500 text-center"
                                        onClick={()=>{
                                            const newdata = {
                                                "id": data._id,
                                                "status": status
                                            }
                                            API.patch("/transaksi",newdata,config)
                                            .then((res)=>{
                                                if(res.data.status){
                                                    setTriger(!triger)
                                                }
                                            })
                                            .catch((err)=>{
                                                console.log(err)
                                            })
                                        }}
                                        ><p className="animate-ping">Send</p></button>
                                    </div>
                                </div>}
                                
                            </div>
                            <div className="w-11/12 m-auto pt-2 grid grid-cols-6">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2 text-sm">Detail Orders</p>
                                    </div>
                                    <div className="col-span-4">
                                   
                                        <button
                                        className="w-full rounded-tl-lg h-7 rounded-br-lg bg-green-500 text-center mr-2"
                                        onClick={()=>{
                                            setDetailOrdersId(data._id)
                                            setHandleShowDetailOrders(true)
                                        }}
                                        ><FaArrowDown
                                        className="float-right mr-2"
                                        /></button>
                                        {data._id == detailOrderId ?
                                        <Modal
                                        show={handleShowDetailOrders} 
                                        handleshow={setHandleShowDetailOrders} 
                                        heigh={"5/6"} 
                                        width={"5/12"}
                                        >
                                            <>
                                            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 w-11/12 m-auto pt-2">
                                                {data.detailOrder.map((kambing,index)=>(
                                                    <div key={index}
                                                    onClick={()=>history.push('/detail-mygot/'+kambing._id)}
                                                    className="rounded w-full bg-white border-2 border-green-700 bg-gradient-to-b from-green-100 shadow-2xl to-green-700"
                                                    >
                                                        <div className="text-center mt-2 mb-2 text-sm">
                                                            <p className="text-sm overflow-hidden text-yellow-600">{kambing.id_tag}</p>
                                                        </div>
                                                        <div>
                                                            <img src={BaseURL+"/single/"+kambing.img}
                                                            className="w-12/12 h-20 rounded m-auto"
                                                            />
                                                        </div>
                                                    </div>))}
                                                
                                            </div>
                                            <div className="absolute bottom-0 left-0">
                                                <img src={KambingBrown}
                                                className="w-full"
                                                />
                                            </div>
                                            </>
                                        </Modal>:null}
                                
                                    </div>
                                        
                                        {/* <p className="font-semibold ml-2">Harga : {data.totBayar}</p> */}
                                </div>
                                <div className="mb-5"/>
                                <div className="w-11/12 m-auto h-1 bg-white rounded"/>
                                    
                                <div className="w-11/12 m-auto pt-2 grid grid-cols-6">
                                    <div className="col-span-2">
                                        <p className="font-semibold ml-2">Bayar</p>
                                    </div>
                                    <div className="rounded-tl-lg col-span-4 rounded-br-lg bg-green-500 text-right">
                                        <p className="font-semibold mr-2">{data.totBayar}</p>
                                    </div>
                                        
                                        
                                </div>
                            {data.img !== ""?
                            <div
                            className="w-11/12 m-auto"
                            >
                                <div className="mb-10"/>
                                <div className="pt-2">
                                    <>
                                        <button className="w-full bg-white rounded-lg"
                                        onClick={()=>{
                                            setBuktitfID(data._id)
                                            setHandleShowBuktiTF(true)
                                        }}
                                        >Show Bukti Transfer</button>
                                        {data._id == buktitfId ?
                                        <Modal
                                        show={handleShowBuktiTF} 
                                        handleshow={setHandleShowBuktiTF} 
                                        heigh={"5/6"} 
                                        width={"5/12"}
                                        top={10}
                                        >
                                            <>
                                            <div className="w-12/12 m-auto">
                                                <img src={BaseURL+"/single/"+data.img}
                                                className="w-full rounded mt-5"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0">
                                                <img src={KambingBrown}
                                                className="w-full"
                                                />
                                            </div>
                                            </>
                                        </Modal>:null} 
                                    </>
                                 
                                </div>
                            </div>:
                            <div className="w-11/12 m-auto pt-2 rounded">
                                {data.status == "Pending" && auth.role == "2" && <button
                                className="w-full bg-white rounded"
                                onClick={()=>{
                                    setShow(true)
                                    setNewIndex(data._id)
                                }}
                                >Upload</button>}
                            </div>}
                            {data._id == newIndex ?<Modal
                                show={show} 
                                handleshow={setShow} 
                                heigh={"4/6"} 
                                width={"5/12"}
                                top={36}
                                >
                                    {Message == "" ?
                                    <>
                                    <div className="w-11/12 m-auto">
                                        <p className="text-center text-white font-bold pt-2">Upload Image Transaksi Number : {newIndex} </p>
                                    </div>
                                    <div className="w-11/12 m-auto pt-3">
                                    <div className="w-11/12 m-auto">
                                        <div className="w-auto pb-10 bg-red-400 rounded text-green-200">
                                            <input
                                            type="file"
                                            onChange={(e)=>imageUpload(e)}
                                            className="w-auto pointer-events-auto cursor-pointer text-white"
                                            ></input>
                                            {image == "" && <div>
                                                <span>Upload Bukti Transfer</span>
                                            </div>}  
                                            </div>
                                            <div className="w-auto text-center rounded bg-red-400 mt-2">
                                                <img src={imagepreview}
                                                className="w-10/12 m-auto pt-2 pb-2 rounded"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {imagepreview && <div className="w-11/12 m-auto pt-2">
                                    <button className="bg-white w-20  h-10 rounded"
                                    onClick={()=>{
                                        const newdata = new FormData()
                                        newdata.append("id",newIndex)
                                        newdata.append("file",image)
                                        API.patch("/transaksi-img",newdata,config)
                                        .then((res)=>{
                                            if(res.data.status == 200){
                                                setMessage(res.data.message)
                                                setTimeout(()=>{
                                                    setMessage("")
                                                    setShow(!show)
                                                    setTriger(!triger)
                                                },1000)
                                            }
                                        })
                                        .catch((err)=>{
                                            setMessage(err)
                                            setTimeout(()=>{
                                                setMessage("")
                                            },3000)
                                        })
                                    }}
                                    >Upload</button>
                                    </div>}
                                    </>:
                                    <>
                                        <div className="w-11/12 m-auto pt-10">
                                            <p
                                            className="text-white font-bold text-2xl text-center"
                                            >{Message}</p>
                                        </div>
                                    </>}
                                </Modal>:null}
                            </>
                        </div>
                    ))}
                </div>
                    
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    auth : state.auth
  });
  
  export default connect(mapStateToProps, {})(Transaksi);
