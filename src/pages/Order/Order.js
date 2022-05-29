import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import { API, BaseURL, config } from '../../config/API'
import Modal from "../../components/Modal/Modal"
const Order = ({order}) => {
    const [orderData,setOrderData] =  useState(order.order)
    const [show,setShow] = useState(false)
    const [notes,setNotes] = useState("")
    const [Message,setMessage] = useState("")
    let total = 0;
    const dispatch = useDispatch()
    const SUM=(data)=>{
        total = total + data
        return data
    }
    const validating=(orde,kambing)=>{
        let newOrder=[]
        for(let i=0;i<orde.length;i++){
            if(orde[i]._id != kambing._id){
                newOrder.push(orde[i])
            }
        }
        dispatch({
            type : "ADD ORDER",
            payload : newOrder
        })
        
        setOrderData(newOrder)
    }

    const note = [
        {"note": "Transaksi akan berlaku 24 jam"},
        {"note": "Setelah melakukan transaksi diharap bisa mengupload bukti transfer"},
        {"note": "Jika dalam 2 jam transaksi belum di approve silahkan menghubungi admin"},
        {"note": "x"},
        {"note": "x"},
        {"note": "x"},
    ]
    return (
        <div>
            {orderData.length > 0 ?
            <div className="md:ml-80 pt-10">
                <div className=" w-11/12 grid grid-cols-2 lg:grid-cols-4 gap-5 m-auto">
                    {orderData.map((kambing,index)=>(
                    <div key={index}
                    className="rounded w-full bg-green-400"
                    >
                        <div className="text-center mt-2 mb-2 text-white">
                            <p>Id Tag : {kambing.id_tag}</p>
                        </div>
                        <div>
                            <img src={BaseURL+"/single/"+kambing.img}
                            className="w-11/12 h-44 rounded m-auto"
                            />
                        </div>
                        <div className="pt-2 pb-2 w-11/12 m-auto grid grid-cols-2 gap-2">
                            <div className="pt-2 pb-2 w-full m-auto">
                                <button className="bg-green-700 w-full text-white rounded"
                                >Detail</button>
                            </div>
                            <div className="pt-2 pb-2 w-full m-auto">
                                <button className="bg-red-700 w-full text-white rounded"
                                onClick={()=>{
                                    let Databooking = order.order
                                    validating(Databooking,kambing)
                                }}
                                >Delet</button>
                            </div>
                        </div>
                        <div className="pt-2 pb-2 w-11/12 m-auto">
                            <p
                            className="font-medium"
                            >Harga : {SUM(kambing.type.harga * kambing.bb[0].bb)}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>:<Redirect to="/kambing"/>}
            <div className="md:ml-80 pt-10">
                <div className=" w-11/12 m-auto flex">
                        <div className="w-8/12 lg:w-3/12 bg-green-400 rounded"
                        >
                            <p
                            className="p-2 font-medium text-red-700"
                            >Total bayar : {total}</p>
                        </div>
                    <div className="ml-2 bg-green-400 rounded">
                        <button  className="p-2 font-medium"
                        onClick={()=>setShow(!show)}
                        >
                            Bayar
                        </button>
                    </div>
                </div>
            </div>
            <Modal
            show={show} 
            handleshow={setShow} 
            heigh={"64"} 
            width={"5/12"}
            top={36}
            >
                {Message == "" ?
                <>
                <div className="w-11/12 m-auto">
                    <p className="text-center text-white font-bold">NOTE</p>
                </div>
                {note.map((data,index)=>(
                    <div key={index}
                    className="w-11/12 m-auto"
                    >
                        <p
                        className="text-left text-white text-sm"
                        >{index+1}{" . "}{data.note}</p>
                    </div>
                ))}
                <div className="text-right text-white w-11/12 m-auto pt-2">
                    <input
                    placeholder="Insert Note"
                    className="w-full mb-2 rounded text-center text-black"
                    value={notes}
                    onChange={(e)=>setNotes(e.target.value)}
                    />
                    <p 
                    className="font-medium rounded text-left"
                    >Total Bayar : {total}</p>
                    <button
                    className="w-3/12 bg-white text-green-500 font-medium rounded mt-2"
                    onClick={()=>{
                        const newData = {
                            "detailOrder": orderData,
                            "totBayar":total,
                            "note":notes
                        }
                        API.post("/transaksi",newData,config)
                        .then((res)=>{
                            if(res.data.status == 200){
                                setMessage(res.data.message)
                                setTimeout(()=>{
                                    setMessage("")
                                    setShow(!show)
                                    dispatch({
                                        type : "ADD ORDER",
                                        payload : []
                                    })
                                    setOrderData([])
                                },3000)
                            }
                        })
                        .catch((err)=>{
                            setMessage(err)
                            setTimeout(()=>{
                                setMessage("")
                            },3000)
                        })
                    }}
                    >Bayar</button>
                </div>
                </>:
                <>
                    <div className="w-11/12 m-auto pt-10">
                        <p
                        className="text-white font-bold text-2xl text-center"
                        >{Message}</p>
                    </div>
                </>}
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order
  });
  
  export default connect(mapStateToProps, {})(Order);