import React,{useEffect,useState} from 'react'
import Modal from '../Modal/Modal'
import { useMediaQuery } from "react-responsive";
import FormAddItem from '../Form/FormAddItem';
import FormEditItem from '../Form/FormEditItem';
import { API, config } from '../../config/API';
const CardEditAndDelet = (props) => {
    const [show,setShow] = useState(false)
    const [showUpdateImage,setShowUpdateImage] = useState(false)
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const isPortrait = useMediaQuery({ query: "(max-width: 800px)" });
    const data = [
        {
            "name" : "namabarang",
            "value" : props.data.namabarang,
            "type" : "str"
        },
        {
            "name" : "PO",
            "value" : props.data.PO,
            "type" : "int"
        },
        {
            "name" : "desk",
            "value" : props.data.desk,
            "type" : "str"
        },
        {
            "name" : "stock",
            "value" : props.data.stock,
            "type" : "int"
        },
        {
            "name" : "buy",
            "value" : props.data.buy,
            "type" : "int"
        },
        {
            "name" : "sell",
            "value" : props.data.sell,
            "type" : "int"
        },
        {
            "name" : "codeItem",
            "value" : props.data.codeItem,
            "type" : "str"
        },
        {
            "name" : "berat",
            "value" : props.data.berat,
            "type" : "int"
        }
    ]
    const [newItem,setNewItem] = useState(data)
    // console.log(props.data)
    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
  return (
    <div className='grid grid-cols-2 w-full text-center mt-2'>
        <div className='bg-green-300 ml-2'>
            <button
            onClick={()=>setShow(!show)}
            className='w-full font-bold'
            >Edit</button>
        </div>
        
        <div className='bg-red-500 mr-2'>
            <button
            className='w-full font-bold'
            onClick={()=>{
                API.patch("/item/status/"+props.data.id,{"status":0},config)
                .then((res)=>{
                    alert("Success Update Image "+res.data.data)
                    props.setTriger(!props.triger)
                })
                .catch((err)=>{
                    alert(err.response)
                })
            }}
            >Delet</button>
        </div>
        <div className='bg-green-300 ml-2 mt-2'>
            <button
            onClick={()=>setShowUpdateImage(!showUpdateImage)}
            className='w-full font-bold'
            >Edit Image</button>
        </div>
        {data.length > 0 &&
        <Modal
          show={show}
          handleshow={setShow}
          width={!isPortrait ? "11/12" : "full"}
          top={!isPortrait ? "2" : "2"}
          left={isPortrait ? "0" : "20"}
        >
            <div className='w-full h-full bg-green-700'>
                <p className='text-white text-3xl font-bold'>EDIT ITEM</p>
                <div className='w-10/12 m-auto pt-10'>
                    {data.map((data,index)=>(
                        <div className='mt-2'>
                            <FormEditItem  data={data} index={index} newItem={newItem} setNewItem={setNewItem}/>
                        </div>
                    ))}
                </div>
                <div className='mt-10'>
                    <button 
                    className='bg-green-400 w-40 h-10 font-bold text-xl rounded hover:bg-white'
                    onClick={()=>{
                        let newdata = {}
                        for(let i = 0;i<newItem.length;i++){
                            newdata[newItem[i].name]=newItem[i].value
                        }
                        // console.log(newdata)
                        API.patch("/item/"+props.data.id,newdata,config)
                        .then((res)=>{
                            alert(res.status)
                            props.setTriger(!props.triger)
                        })
                        .catch((err)=>{
                            alert(err.response.data.message)
                        })
                    }}
                    >Update Item</button>
                </div>
            </div>
        </Modal>}
        <Modal
          show={showUpdateImage}
          handleshow={setShowUpdateImage}
          width={!isPortrait ? "11/12" : "full"}
          top={!isPortrait ? "2" : "2"}
          left={isPortrait ? "0" : "20"}
        >
            <div className='w-full bg-green-700 h-full'>
                <p className='text-white text-3xl font-bold'>Update Image</p>
                <div className='mt-10'>
                   <input
                    type='file'
                    onChange={(e)=>imageUpload(e)}
                    /> 
                </div>
                <div className='mt-5'>
                    <img 
                    className='w-8/12 m-auto rounded'
                    src={imagepreview}/>
                </div>
                <button
                className='mt-3 w-40 bg-green-200 text-lg font-bold rounded'
                onClick={()=>{
                    const dataSubmit = new FormData()
                    dataSubmit.append("file",image)
                    API.patch("/item/img/"+props.data.id,dataSubmit,config)
                    .then((res)=>{
                        alert("Success Update Image "+res.data.data)
                        props.setTriger(!props.triger)
                    })
                    .catch((err)=>{
                        alert(err.response)
                    })
                }}
                >Update</button>
            </div>
        </Modal>
    </div>
  )
}

export default CardEditAndDelet