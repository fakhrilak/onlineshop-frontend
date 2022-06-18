import React,{useEffect, useState} from 'react'
import {FaArrowDown} from "react-icons/fa"
import { BaseURL } from '../../config/API'
const CardTransaksi = ({data}) => {
    const [show,hansleShow] = useState(false)
    const [harga,setHarga] = useState()
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    useEffect(()=>{
        if(data){
            let total = 0
        let totalharga = 0
        let berat=0
        for(let i = 0;i<data.saleItems.length;i++){
            total += data.saleItems[i].banyak
            totalharga +=data.saleItems[i].totalBayarItem
            berat +=(data.saleItems[i].banyak*data.saleItems[i].Item.berat)
        }
        setHarga({total:total,totalharga:totalharga,berat:berat})
        }
        
    },[])
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
  return data?(
    <div className='w-full bg-green-300 mt-10 rounded'>
            <p className='text-black mr-5 mt-2 mb-2 text-right'>{data.status}
            <p onClick={()=>hansleShow(!show)}
            className="float-right mt-1 ml-2"
            ><FaArrowDown size={20}/></p></p>
        <div className='border-t-2 border-black'/>
        {show ? data.saleItems.map((items,index)=>(
            <div key={index}
            className="m-2 pb-2 grid grid-cols-3"
            >
                <div>
                    <img src={BaseURL+"/single/"+items.Item.picture}
                    className="w-44 h-44 mb-2 rounded m-auto"
                    />
                </div>
                <div>
                    <p className='text-lg font-bold text-center'>{items.Item.namabarang}</p>
                    <div className='border-t-2 mt-2 mb-2 border-black'/>
                    <p className='mt-2 text-xs'>{items.Item.desk}</p>
                    <p className='text-right mt-5'>PO {items.Item.PO}</p>
                    <p className='mt-2 text-lg font-bold'>RP {items.Item.sell}</p>
                </div>
                <div>
                    <p className='text-lg font-bold text-center'>({items.banyak} barang) {items.totalBayarItem}</p>
                </div>
            </div>
        )):null}
        <>
            <div
            className="m-2 pb-2 grid grid-cols-3"
            >
                {data.status == "Witing Payment"?
                <div>
                    <p>Please Upload Bukti Transfer</p>
                    <div>
                        <input
                        type='file'
                        onChange={(e)=>imageUpload(e)}
                        />
                        <div className="w-auto text-center pt-10">
                            <img src={imagepreview}
                            className="w-9/12 m-auto"
                            />
                        </div>
                        <button
                        className='w-20 border-2 border-green-200 rounded mt-2'
                        >Upload</button>
                    </div>
                </div>:
                <div>
                    sudah dibayar
                </div>}
            </div>
        </>
        <>
            {show && harga?<div className='border-t-2 mt-2 mb-2 border-black'/>:null}
            <div>
                <p className='ml-2'>Info Pengiriman</p>
                <div className='grid grid-cols-3 gap-4 text-left ml-5'>
                    <p className=''>Kurir</p>
                    <p  className=''>
                        {data.kirim.service}
                        {" - "}
                        {data.kirim.name}
                    </p>
                </div>
                <div className='grid grid-cols-3 gap-4 text-left ml-5 mt-2'>
                    <p className=''>Resi Number</p>
                    <p  className=''>
                        {data.resinumber}
                    </p>
                </div>
                <div className='grid grid-cols-3 gap-4 text-left ml-5 mt-2'>
                    <p className=''>Alamat</p>
                    <p  className=''>
                        {data.kirim.Alamat.detailAlamat}{" - "}{data.kirim.city_name}{" - "}{data.kirim.province}
                    </p>
                </div>
            </div>
        </>
        <>
            {show && harga?<div className='border-t-2 mt-2 mb-2 border-black'/>:null}
            <div className='mt-5'>
                <p className='ml-2'>Rincihan Pembayaran</p>
                <div className='grid grid-cols-3 gap-4 text-left ml-5'>
                    {harga ?<p className=''>Total Harga ({harga.total}{" "}barang)</p>:null}
                    {harga ?<p  className='text-right'>
                        {harga.totalharga}
                    </p>:null}
                </div>
                <div className='grid grid-cols-3 gap-4 text-left ml-5 mt-2'>
                    {harga ? <p className=''>Total Berat  ({harga.berat}{" "}gr)</p>:null}
                    {harga ?<p  className='text-right'>
                        {data.kirim.value}
                    </p>:null}
                </div>
            </div>
        </>
        <>
            {show && harga?<div className='border-t-2 mt-2 mb-2 border-black'/>:null}
            <div className='mt-5'>
                <div className='grid grid-cols-3 gap-4 text-left ml-5'>
                    {harga ?<p className=''>Total Belanja</p>:null}
                    {harga ?<p  className='text-right'>
                        {data.total}
                    </p>:null}
                </div>
            </div>
        </>
    </div>
  ):null
}

export default CardTransaksi