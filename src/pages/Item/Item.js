import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import shoppingchart from "../../img/ShoppingChart.png"
import duit from "../../img/duit.png"
import Sidebar from '../../components/Sidebar/Sidebar'
import {API, BaseURL, config,Socket} from "../../config/API"
import {FaArrowAltCircleUp} from "react-icons/fa"
import CardItem from '../../components/Card/CardItem'
import FormAddItem from '../../components/Form/FormAddItem'
import {FaShoppingCart} from "react-icons/fa"
import CardEditAndDelet from '../../components/Card/CardEditAndDelet'
const Item = ({order,auth}) => {
    const [item,setItem] = useState()
    const [triger,setTriger] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
        API.get("/item?status=1",config)
        .then((res)=>{
            setItem(res.data.data)
            console.log(res.data.data)
            dispatch({
                type:"ITEMS",
                payload:res.data.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[triger])
    return (
        <div className='h-full md:ml-80'>
        {order.order.length ?<button
        onClick={()=>history.push("/order")}
        className='grid grid-cols-2 '
        ><FaShoppingCart size={30}/> <p className='text-lg'>{order.order.length}</p></button>:null}
        <div className="pt-10 grid grid-cols-5 gap-3">
            {item?item.map((data,index)=>(
                <div>
                    <CardItem key={index} data={data} showkeranjang={true}/>
                    {auth.role ? 
                    <>{auth.role ==1 && <CardEditAndDelet data={data} setTriger={setTriger} triger={triger}/>}</>
                    :null}
                </div>
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
  
