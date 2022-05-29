import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import Sidebar from '../../components/Sidebar/Sidebar'
import { API, config } from '../../config/API'
import { useMediaQuery } from 'react-responsive'
const Users = () => {
    const [users,setUsers] = useState([])
    const [handledelet,setHandleDelet] = useState(false)
    const [handleVerified,setHandleVerified] = useState(false)
    const [delId,setDelId] = useState(null)
    const [Password,setPassword] = useState(null)
    const [message,setMessage] = useState("")
    const [triger,setTriger] = useState(false)
    useEffect(()=>{
        API.get("/users",config)
        .then((res)=>{
            setUsers(res.data.data)
        })
    },[triger])
    const isPortrait = useMediaQuery({ query: '(max-width: 667px)' })
    let header;
    if(isPortrait){
        header = [
            "NO","USER NAME"
        ]
    }else{
        header = [
            "NO","USER NAME", "EMAIL"
        ]
    }
    const handlingVefifikasi=(id)=>{
        setDelId(id)
        setHandleVerified(!handleVerified)
    }
    const handleDelet=(id)=>{
        API.delete(`/users/${Password}/${id}`,config)
        .then((res)=>{
            console.log(res.data)
            if(res.data.status == 400){
                setMessage(res.data.message)
                setPassword("")
                setTimeout(()=>{
                    setMessage("")
                },1000)
            }else if(res.data.status == 200){
                setHandleVerified(false)
                setTriger(!triger)
                setPassword("")
            }
            
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
    return (
        <div className="w-full">
              <div className="lg:ml-80 mt-10">
                <button
                onClick={()=>setHandleDelet(!handledelet)}
                className="ml-4 bg-red-400 w-40 text-white rounded"
                >Delet</button>
              </div>
              <div className="h-full md:ml-64 pt-10">
              <div className="w-10/12 m-auto">
              <table class="w-full table-auto">
                    <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                {header.map((data,index)=>(
                                    <th className="py-3 px-6 text-center"
                                    key={index}
                                    >{header[index]}</th>
                            ))}
                            {handledelet && <th className="py-3 px-6 text-center">Select to delet</th>}
                            </tr>
                    </thead>
                    <tbody class="text-emerald-700 text-sm font-light">
                            {users.map((data,index)=>(
                                <tr
                                key={index}
                                class="border-b border-gray-200 hover:bg-gray-100 hover:text-green-700 text-lg font-bold">
                                    <td
                                    className="py-3 px-6 text-left whitespace-nowrap w-1/12" 
                                    >{index + 1}</td>
                                    <td
                                    className="py-3 px-6 text-left whitespace-nowrap text-center w-3/12"
                                    >{data.username}</td>
                                    {!isPortrait && <td
                                    className="py-3 px-6 text-left whitespace-nowrap text-center w-5/12"
                                    >{data.email}</td>}
                                    {handledelet && <td
                                    className="py-3 px-6 text-left whitespace-nowrap text-center"
                                    onClick={()=>handlingVefifikasi(data._id)}
                                    >x</td>}
                                </tr>
                            ))}
                    </tbody>
                </table>
              </div>
              <div>
                  <Modal 
                  show={handleVerified} 
                  handleshow={handlingVefifikasi} 
                  heigh={40} 
                  width={"5/12"}
                  >
                        <div className="text-white text-center">
                            <p className="font-bold text-2xl">Verifikasi Password</p>
                        </div>
                        <div className="w-80 m-auto pt-4">
                            <p className="text-white text-center">{message}</p>
                            <div>
                                <input
                                value={Password}
                                className="rounded w-80 text-center"
                                placeholder="Input Password"
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                 <button
                                 className="bg-white w-20 mt-3 rounded text-green-700 font-bold"
                                 onClick={()=>handleDelet(delId)}
                                 >SEND</button>
                            </div>
                        </div>
                  </Modal>
              </div>
              </div>
        </div>
    )
}

export default Users
