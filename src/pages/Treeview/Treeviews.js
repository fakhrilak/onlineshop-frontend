import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Graphin , { Utils }from '@antv/graphin';
import TreeNode from './TreeNodee';
import { API, config } from '../../config/API'
import { halperNodes,halperEdges } from './helper';

const Treeviews = () => {
  const [data,setData] = useState()
  useEffect(()=>{
    API.get("/perkawinan",config)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
  },[])
  
    return (
        <div>
            {data &&<div className="h-screen md:ml-80 pt-10">
                <div>
                    <Graphin data={data}/>
                </div>           
            </div>}
        </div>
    )
}

export default Treeviews
