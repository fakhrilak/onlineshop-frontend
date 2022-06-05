import React, { useEffect, useState } from 'react'
import { API, config } from '../../config/API'

const FormAlamat = ({trigerAdd,setTrigerAdd}) => {
    const [province,setProVince]=useState()
    const [citys , setCitys] = useState()
    const [mycitys , setmyCitys] = useState()
    const [detailAlamat,setDetailAlamat] = useState()
    useEffect(()=>{
        // API.get("/rajaOngkir?type=cities")
        // .then((res)=>{
        //     console.log(res.data.data)
        //     setProVince(res.data.data.rajaongkir.results)
        // })
        // .catch((err)=>{
        //     alert(err.message)
        // })
        API.get("/rajaOngkir?type=cities")
        .then((res)=>{
            setCitys(res.data.data.rajaongkir.results)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])
    const onADD=()=>{
        let data = citys[mycitys]
        data.detailAlamat = detailAlamat
        console.log(data)
        console.log(localStorage.getItem('token'))
        API.post("/alamat",data,config)
        .then((res)=>{
            alert(res.data.message)
            setTrigerAdd(!trigerAdd)
        })
        .catch((err)=>{
            alert(err)
        })
    }
  return citys?(
    <div className='mb-10'>
        <p className='font-bold mb-2'>ADD ALAMAT</p>
        <div className='bg-green-200 w-11/12 m-auto rounded grid grid-cols-2 gap-3 border-2 border-black'>
            {/* <select>
                <option>Choos Provincies</option>
                {province.map((data,index)=>(
                    <option key={index}>{data.province}</option>
                ))}
            </select> */}
            <select
            value={mycitys}
            onChange={(e)=>setmyCitys(e.target.value)}
            >
                <option>Choos Provincies</option>
                {citys.map((data,index)=>(
                    <option key={index} value={index}>
                        {data.province}{" | "}
                        {data.city_name}{" | "}
                        {data.postal_code}
                    </option>
                ))}
            </select>
            <div className=''>
                <textarea
                className='w-11/12'
                value={detailAlamat}
                type='text'
                placeholder='Search'
                onChange={(e)=>setDetailAlamat(e.target.value)}
                />  
            </div>
        </div>
        <div
        className='mt-2 ml-10'
        >
            <button
            className='bg-green-200 w-20 font-bold rounded'
            onClick={()=>onADD()}
            >ADD</button>
        </div>
    </div>
  ):(<div>Waiting data</div>)
}

export default FormAlamat