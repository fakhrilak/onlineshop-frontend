import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { API, config } from '../../config/API'
import Navbar from '../../components/Navbar/Navbar'
import Table from '../../components/Table/Table'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMediaQuery } from 'react-responsive'
const BeratBadan = () => {
    const [mygot,setMygot] = useState([])
    const history = useHistory()
    useEffect(()=>{
        API.get("id-tag",config)
        .then((res)=>{
            console.log(res.data.data)
            setMygot(res.data.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])
    const isPortrait = useMediaQuery({ query: '(max-width: 667px)' })
    let header;
    if(isPortrait){
        header = [
            "ID TAG","USER NAME"
        ]
    }else{
        header = [
            "ID TAG","USER NAME", "EMAIL"
        ]
    }
    return (
        <div>        
        <div className="h-full md:ml-64 pt-10">
            <div className="w-10/12 m-auto">
            {mygot.length > 0 ?
            (<table className="w-full">
                <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            {header.map((data,index)=>(
                                 <th class="py-3 px-6 text-center"
                                 key={index}
                                 >{header[index]}</th>
                        ))}
                        </tr>
                </thead>
                <tbody class="text-emerald-700 text-sm font-light">
                
                        {mygot.map((data,index)=>(
                            <tr 
                            onClick={()=>history.push(`/detail-mygot/${data._id}`)}
                            key={index}
                            class="border-b border-gray-200 hover:bg-gray-100 hover:text-green-700 text-xs lg:text-lg font-bold">
                                <td
                                 class="py-3 px-3 lg:px-6 text-left whitespace-nowrap text-center"
                                >{data.id_tag}</td>
                                <td
                                 class="py-3 px-3 lg:px-6 text-left whitespace-nowrap text-center"
                                >{data.User.username}</td>
                                {!isPortrait && <td
                                 class="py-3 px-3 lg:px-6 text-left whitespace-nowrap text-center"
                                >{data.User.email}</td>}
                            </tr>
                        ))}
                    
               
                </tbody>
            </table>): 
            (<div>
                        <br></br>
                            <h4 className="font-bold">Data belum tersedia</h4>
                            </div>)
            }
            </div>
          
            </div>
            
        
        </div>
    )
}

export default BeratBadan
