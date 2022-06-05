import React, { useEffect, useState } from 'react'
import { API, config,BaseURL } from '../../config/API'
import Sidebar from '../../components/Sidebar/Sidebar'
import { connect, useDispatch } from 'react-redux'
import CardTransaksi from '../../components/Card/CardTransaksi'

const Transaksi = ({auth:{users}}) => {
    const [transaksi,setTransaksi] = useState()
    useEffect(()=>{
        if(users){
            API.get("/transaksi",config)
            .then((res)=>{
                setTransaksi(res.data.data)
            })
            .catch((err)=>{
                alert(err)
            })
        }
        
    },[users])
    return users?(
        <div >
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
