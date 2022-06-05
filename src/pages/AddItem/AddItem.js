import React, { useState } from 'react'
import { API, config } from '../../config/API'
import {datainput} from "./data"
const AddItem = () => {
    const [namabarang,setNamaBarang] = useState()
    const [PO,setPO] = useState()
    const [desk,setDesk] = useState()
    // const [stock,setStock] = useState()
    const [buy,setBuy] = useState()
    const [sell,setsell] = useState()
    const [codeItem,setcodeItem] = useState()
    const [berat,setBerat] = useState()

    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
      const onClick = ()=>{
        let data = new FormData()
        data.append("namabarang",namabarang)
        data.append("buy",buy)
        data.append("PO",PO)
        data.append("desk",desk)
        data.append("sell",sell)
        data.append("file",image)
        data.append("berat",berat)
        data.append("codeItem",codeItem)
        API.post("/item",data,config)
        .then((res)=>{
            alert(res.data.message)
            
        })
        .catch((err)=>{
            console.log(err)
        })
      }
  return (
    <div className="ml-80 pt-10">
        <p className='font-bold text-center'>Add Item</p>
        <div className='grid grid-cols-2'>
            <div>
        <div className="w-11/12 mb-3 mt-5">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                Nama Barang
            </label>
            <input
            value={namabarang}
            className="border-2 border-black"
            placeholder="Nama Barang"
            onChange={(e)=>setNamaBarang(e.target.value)}
            />
        </div>
        <div className="w-11/12 mb-3 mt-2">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                PO Time
            </label>
            <input
            value={PO}
            className="border-2 border-black"
            placeholder="PO Time"
            onChange={(e)=>setPO(e.target.value)}
            />
        </div>
        <div className="w-11/12 mb-3 mt-2">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                DESCRIPTION
            </label>
            <input
            value={desk}
            className="border-2 border-black"
            placeholder="DESCRIPTION"
            onChange={(e)=>setDesk(e.target.value)}
            />
        </div>
        <div className="w-11/12 mb-3 mt-2">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                HARGA BELI
            </label>
            <input
            value={buy}
            className="border-2 border-black"
            placeholder="HARGA BELI"
            onChange={(e)=>setBuy(e.target.value)}
            />
        </div>
        <div className="w-11/12 mb-3 mt-2">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                HARGA JUAL
            </label>
            <input
            value={sell}
            className="border-2 border-black"
            placeholder="HARGA JUAL"
            onChange={(e)=>setsell(e.target.value)}
            />
        </div>
        <div className="w-11/12 mb-3 mt-2">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                ITEM CODE
            </label>
            <input
            value={codeItem}
            className="border-2 border-black"
            placeholder="CODE ITEM"
            onChange={(e)=>setcodeItem(e.target.value)}
            />
        </div>
        <div className="w-11/12 mb-3 mt-2">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                BERAT (gr)
            </label>
            <input
            value={berat}
            className="border-2 border-black"
            placeholder="BERAT (gr)"
            onChange={(e)=>setBerat(e.target.value)}
            />
        </div>
            </div>
            <div className='mt-5'>
                <input
                type="file"
                onChange={(e)=>imageUpload(e)}
                className="mb-5 pointer-events-auto cursor-pointer"
                ></input>
                {imagepreview ?<img src={imagepreview}
                    className="w-10/12 m-auto rounded border-2 border-black"
                />:null}
                {imagepreview ? <button
                onClick={()=>onClick()}
                >Submit</button>:null}
            </div>
        </div>
    </div>
  )
}

export default AddItem