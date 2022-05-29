
import React from 'react'
import "./Modal.css"
const Modal = (props) => {
  const {show,handleshow,width,heigh,top} = props
  return (
    <div>
        {show? (
        <div className="w-screen">
            <div
            className="justify-center opacity-25 bg-black  fixed inset-0 z-40 outline-none focus:outline-none"
            onClick={()=>handleshow()}
            >
          </div>
          <div className={`fixed top-20 lg:top-${top} left-4 lg:left-1/3 bg-gradient-to-b from-green-100 shadow-2xl to-green-700 border-2 border-green-700 w-11/12 lg:w-${width} h-${heigh} z-50 rounded-lg m-auto`}>
                {props.children}
          </div>
        </div>
      ) : null}
    </div>
    
  )
}
export default Modal
