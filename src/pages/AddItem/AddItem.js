import React, { useState } from 'react'
import FormAddItem from '../../components/Form/FormAddItem'
import { API, config } from '../../config/API'
import {data} from "./data"
const AddItem = () => {
    const [newItem,setNewItem] = useState(data)
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const Onsublit=()=>{
        const dataSubmit = new FormData()
        for(let i = 0;i<newItem.length;i++){
            let value = newItem[i]["value"]
            if (newItem[i]["type"] == "int"){
                parseInt(value)
            }
            dataSubmit.append([newItem[i]["name"]] , value)
        }
        dataSubmit.append("file",image)
        console.log(dataSubmit)
        API.post("/item",dataSubmit,config)
        .then((res)=>{
            alert(res.data.message)
        })
        .catch((err)=>{
            alert(err)
        })
    }
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
  return (
    <div className="ml-80 pt-10">
        <div>
                <p className='font-bold mb-2'>ADD ITEM</p>
                <div className='grid grid-cols-3 gap-2'>
                    {data.map((data,index)=>(
                        <div key={index} className="">
                            <FormAddItem data={data} index={index} newItem={newItem} setNewItem={setNewItem}/>
                        </div>
                    ))}
                </div>
                <div className='mt-2 mb-2'>
                    <button
                    onClick={()=>Onsublit()}
                    className='border-2 border-green-700 w-44 rounded'
                    >
                        Upload Item
                    </button>
                </div>
                
                <input
                type='file'
                onChange={(e)=>imageUpload(e)}
                />
                <div className="w-auto text-center pt-10">
                    <img src={imagepreview}
                    className="w-6/12 m-auto"
                    />
                </div>
            </div>
    </div>
  )
}

export default AddItem