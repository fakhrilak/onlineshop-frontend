import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {useMediaQuery} from "react-responsive"
import "./Navbar.css"

const Navbar = ({auth}) => {
  const {users,isAuthenticated} = auth
  const history = useHistory();
  const dispatch = useDispatch()
  const isBigScreen = useMediaQuery({ query: '(min-width: 1200px)' })


  const logout=()=>{
    dispatch({
      type:"LOGOUT"
    })
  }
    return isBigScreen ?(
        <div classname="navbar_component">
        {isAuthenticated ?
        <nav className="pl-10 pr-0 lg:pr-20">  
          
          <ul>
                <li className="font-semibold text-emerald-700"
                onClick={()=>logout()}
                ><Link>LOGOUT</Link></li>
          </ul>
        </nav>:
          <nav className="pr-0 lg:pr-20 pl-10 ">  
            <ul>
                <li><Link to="/login"><button className="w-16 h-10 rounded text-center text-emerald-700 font-medium">Login</button></Link></li>
                <li><Link to="/register"><button className="w-20 h-9 rounded-2xl border-emerald-700 bg-emerald-700 border-1 text-center text-white font-semibold px-2">SignUp</button></Link></li>
            </ul>
          </nav>
        }
        </div>
    ):null
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
