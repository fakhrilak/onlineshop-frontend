import React from "react"
import logo3 from "../../img/Background.png";
import {useHistory} from "react-router-dom"
const Notfound=()=>{
    const history = useHistory()
    return(
        <div className="w-full h-full bg-green-500">
            <div className="w-12/12 text-center text-4xl lg:text-7xl pt-28 text-black">
                <p>404 NOT FOUND</p>
            </div>
            <div className="w-12/12 text-center text-black mt-20">
                <button 
                onClick={()=>history.push("/kambing")}
                className="w-44 m-auto border-1 border-black rounded">Shop</button>
                <img src={logo3} className="w-6/6 lg:w-4/6 mt-10 lg:m-auto"/>
            </div>
        </div>
    )
}

export default Notfound