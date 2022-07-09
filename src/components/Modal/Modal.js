
import React from 'react'
import "./Modal.css"
const Modal = (props) => {
  const {show,handleshow,width,heigh,top,left} = props
  return (
    <div>
        {show? (
        <div className="w-screen h-11/12 bg-green-700">
            <div
            className="justify-center opacity-20 bg-black  fixed inset-0 z-40 outline-none focus:outline-none"
            onClick={()=>handleshow()}
            >
          </div>
          <div className={`fixed left-${left} right-${left} top-${top} bottom-px lg:top-5 lg:right-10 rounded-lg bg-[#80BA83]  shadow-2xl w-${width} z-50 `}>
                {props.children}
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default Modal
