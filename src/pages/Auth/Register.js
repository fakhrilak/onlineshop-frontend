import React, {useState,useEffect} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SignUp } from "../../redux/actions/Auth";
import { connect,useDispatch} from "react-redux";

const Register = ({SignUp, auth}) => {
    const {message, isAuthenticated} = auth

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch({
    //     type:"UPDATE_ROUTE",
    //     payload : location.pathname
    //     })
    // },[])
    const OnClick = () => {
        SignUp(username, email, password)
    }


  return (
    <>
  {
      isAuthenticated ?
        (<Redirect to="/dashboard"/>) :
      (<main>
        <section className="bg-emerald-700 relative w-full h-full py-20 min-h-screen">
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
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-2">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign Up
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                 
                </div>
                <hr className="mt-3 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center font-bold">
               
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                    onClick={() => OnClick()}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account 
                    </button>
                    <h1 className="py-2 text-red-700 font-bold"><em></em></h1>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     
        

        
        </section>
      </main>)
  }
    </>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {SignUp}) (Register)
