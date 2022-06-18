import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import CardItem from '../../components/Card/CardItem'
import { API, BaseURL, config } from '../../config/API'
const Order = ({order}) => {
    const [orderData,setOrderData] =  useState(order.order)
    const [alamat,setAlamat] = useState()
    const [mycity,setmyCitys] = useState()
    const [note,setNote] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
        API.get("/alamat")
        .then((res)=>{
            setAlamat(res.data.data)
        })
    },[])
    const OnCheckOut=()=>{
        const data = {
            data:order.ordertransac,
            destinationId: parseInt(mycity),
            note : note
        }
        API.post("/transaksi",data,config)
        .then((res)=>{
            alert(res.data.message)
            window.location.href="/transaksi"
            
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    return (
        <div>
            <div className='h-full md:ml-80 grid grid-cols-4 gap-2'>
                {orderData.length > 0?
                orderData.map((data,index)=>(
                    <CardItem key={index} data={data} index={index}/>
                )):null}
            </div>
            <div className='h-full md:ml-80 mt-5'>
                <select
                value={mycity}
                onChange={(e)=>setmyCitys(e.target.value)}
                >
                    <option>Choos Provincies</option>
                    {alamat && alamat.map((data,index)=>(
                        <option key={index} value={data.city_id}>
                            {data.province}{" | "}
                            {data.city_name}{" | "}
                            {data.detailAlamat}
                        </option>
                    ))}
                </select>
            </div>
            <div className='h-full md:ml-80 mt-5'>
                <textarea
                value={note}
                placeholder='Note'
                className='w-10/12 border-2 border-green-700 rounded'
                onChange={(e)=>setNote(e.target.value)}
                />
            </div>
            <div className='h-full md:ml-80 mt-5'>
                <button
                onClick={()=>OnCheckOut()}
                className='border-2 border-green-700 w-20 rounded'
                >Check Out</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order
  });
  
  export default connect(mapStateToProps, {})(Order);