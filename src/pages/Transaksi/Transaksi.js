import React, { useEffect, useState } from 'react'
import { API, config,BaseURL } from '../../config/API'
import Sidebar from '../../components/Sidebar/Sidebar'
import { connect, useDispatch } from 'react-redux'
import CardTransaksi from '../../components/Card/CardTransaksi'

const Transaksi = ({auth:{users}}) => {
    const [transaksi,setTransaksi] = useState()
    const [typetransaksi,setTypetransaksi] = useState()
    useEffect(()=>{
        if(users && typetransaksi){
            API.get("/transaksi?status="+typetransaksi,config)
            .then((res)=>{
                setTransaksi(res.data.data)
            })
            .catch((err)=>{
                alert(err)
            })
        }
    },[typetransaksi,users])
    console.log(typetransaksi)
    return users?(
        <div >
            <select 
            value={typetransaksi}
            onChange={(e)=>setTypetransaksi(e.target.value)}
            className="ml-80 w-1/6 border-2 border-black rounded">
                <option
                className='bg-green-400'
                >choose type transaction</option>
                <option value='Witing Payment'>Witing Payment</option>
                <option value='Pending'>Pending</option>
                <option value='Accepted'>Accepted</option>
                <option value='Rejected'>Rejected</option>
                <option value='Cancel'>Cancel</option>
            </select>
            <div className="ml-80 pt-10">
                <div className='w-11/12 m-auto'>
                    {transaksi?transaksi.map((data,index)=>(
                        <CardTransaksi key={index} data={data}/>
                    )):null}
                </div>
            </div>
        </div>
    ):null
}

const mapStateToProps = (state) => ({
    order: state.order,
    auth : state.auth
  });
  
  export default connect(mapStateToProps, {})(Transaksi);
