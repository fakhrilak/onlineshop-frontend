import React, {useEffect, useState} from "react";
import { Switch, Route, Redirect, Link, useHistory } from "react-router-dom";
import {loadUser, loginAction} from "../../redux/actions/Auth"
import {connect, useDispatch} from "react-redux"
import { GoogleLogin } from 'react-google-login';
import { API, config } from "../../config/API";

const Login = ({loginAction, auth}) => {
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch({
  //     type:"UPDATE_ROUTE",
  //     payload : location.pathname
  //   })
  // },[])
  const {users, isAuthenticated} = auth

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message,setMesaage] =useState(null)
  const [stayle,setStayle] = useState(null)
 
  const OnClick = () => {
    loginAction(email, password)
    console.log("masuk sini dongs")
  }
  useEffect(()=>{
    return(()=>{
        setMesaage(auth.message)
        if(auth.status == 200){
          setStayle("text-green-500")
        }else{
          setStayle("text-red-500")
        }
        setInterval(()=>{
          setMesaage("")
        },5000)
    })
  },[auth])
  console.log(auth.message)
  return (
    <>
    {
      isAuthenticated ?
        (<Redirect to="/item"/>) :
      (<main className="">
      <div className="">
        <section className="relative w-full h-full py-10 min-h-screen bg-green-300">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("../../img/register_bg_2.png").default + ")",
            }}
          ></div>
          <div className="w-full h-full">
        <div className="">
          <div className="w-11/12 lg:w-4/12 m-auto">
            <div className="relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                    {message && <p className={stayle}>{message}</p>}      
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-emerald-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick = {() => OnClick()}
                    >
                      Sign In
                    </button>
                  </div>
                </form>              
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
        </div>
      </main>)
    }
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {loginAction}) (Login)


