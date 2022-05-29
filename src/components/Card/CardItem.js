import React from 'react'
import {FaShoppingCart} from "react-icons/fa"
import { connect, useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
const CardItem = ({data,order,auth:{isAuthenticated,role}}) => {
  const dispatch = useDispatch()
  const history = useHistory()
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
                        <img src={data.picture}
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
                    <div><p 
                      className='text-right ml-2 w-6/6 text-right'
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
                            }
                        }
                        else{
                          history.push("/login")
                        }
                      }}
                      ><FaShoppingCart size={30}/></p>
                    </div>
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