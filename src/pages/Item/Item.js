import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import shoppingchart from "../../img/ShoppingChart.png"
import duit from "../../img/duit.png"
import Sidebar from '../../components/Sidebar/Sidebar'
import {API, BaseURL, config,Socket} from "../../config/API"
import {FaArrowAltCircleUp} from "react-icons/fa"
import CardItem from '../../components/Card/CardItem'
const Item = ({order,auth}) => {
    const [item,setItem] = useState()
    const [triger,setTriger] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
        API.get("/item",config)
        .then((res)=>{
            setItem(res.data.data)
            dispatch({
                type:"ITEMS",
                payload:res.data.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        Socket.on("res-order"+Socket.id,data=>{
            
        })
    },[])
    return (
        <div>
        <div className="h-full md:ml-80 pt-10 grid grid-cols-5 gap-3">
        {item?item.map((data,index)=>(
                <CardItem key={index} data={data}/>
            )):null}
        </div>
    </div>
    )
}
const mapStateToProps = (state) => ({
    order: state.order,
    auth : state.auth
  });
  
  export default connect(mapStateToProps, {})(Item);
  
