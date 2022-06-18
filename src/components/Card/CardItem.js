import React, { useState,useEffect} from 'react'
import {FaShoppingCart} from "react-icons/fa"
import { connect, useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import { BaseURL } from '../../config/API'
const CardItem = ({data,order,auth:{isAuthenticated,role},showkeranjang,index}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  console.log(order.ordertransac)
  const validating=(a,b)=>{
    for(let i = 0; i <a.length;i++){
        if(a[i].id == b.id){
            return false
        }
    }
    return true
  }
  
  return (
    <div>
        <div className=" w-11/12 m-auto">
                <div
                className={`rounded w-full bg-green-400`}
                >
                    <div className="text-center mt-2 mb-2 text-black font-serif">
                        <p>{data.namabarang}</p>
                    </div>
                    <div className="h-1 my-1 border-t-2 border-black" />
                    <div>
                        <img src={BaseURL+"/single/"+data.picture}
                        className="w-11/12 h-44 rounded m-auto"
                        />
                    </div>
                    <div className="text-left ml-2 mt-2 mb-2 mr-2 text-black font-serif text-xs">
                        <p className='truncate hover:text-clip'>{data.desk}</p>
                    </div>
                    <div className="text-left font-bold ml-2 mt-2 mb-2 text-black font-serif text-xl">
                        <p>RP {data.sell}</p>
                    </div>
                    <div className="ml-2 mt-2 mb-2 mr-2 text-black font-serif text-sm">
                        <p className='text-right'>PO: <strong>{data.PO}</strong></p>
                    </div>
                    {showkeranjang ?<div><p 
                      className='text-right ml-2 w-6/6 text-right'
                      >
                       <FaShoppingCart size={30}
                      onClick={()=>{
                        if(isAuthenticated == true && role == 2){
                          let Databooking = order.order
                            const val = validating(Databooking,data)
                            if(val){
                                Databooking.push(data)
                                dispatch({
                                    type:"ADD ORDER",
                                    payload : Databooking
                                })
                                let orderTotransac=[]
                                for(let i=0;i<order.order.length;i++){
                                  orderTotransac.push({
                                    "itemId":order.order[i].id,
                                    "banyak":1,
                                    "harga":order.order[i].sell,
                                    "PO" : order.order[i].PO,
                                    "berat" : order.order[i].berat
                                })
                                }
                                dispatch({
                                  type:"ORDER TRANSAC",
                                  payload : orderTotransac
                              })
                            }
                        }
                        // else{
                        //   history.push("/login")
                        // }
                      }}
                      /></p>
                    </div> :
                    <div className='grid grid-cols-3'>
                      <button
                      onClick={()=>{
                        if(isAuthenticated == true && role == 2){
                          let Databooking = order.ordertransac
                          Databooking[index].banyak +=1
                            dispatch({
                                type:"ORDER TRANSAC",
                                payload : Databooking
                            })
                        }}}
                      >+</button>
                      <button>{order.ordertransac[index].banyak}</button>
                      <button
                      onClick={()=>{
                        if(isAuthenticated == true && role == 2){
                          let Databooking = order.ordertransac
                          if( Databooking[index].banyak > 1){
                            Databooking[index].banyak -=1
                            dispatch({
                                type:"ORDER TRANSAC",
                                payload : Databooking
                            })
                          }else{
                            Databooking.splice(index, 1);
                            dispatch({
                              type:"ORDER TRANSAC",
                              payload : Databooking
                            })
                            let daa = order.order
                            daa.splice(index, 1);
                            dispatch({
                              type:"ADD ORDER",
                              payload : daa
                            })
                          }
                        }}}
                      >-</button>
                    </div>}
                    
                </div>
            </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  order: state.order,
  auth : state.auth,
  item : state.item
});

export default connect(mapStateToProps, {})(CardItem);