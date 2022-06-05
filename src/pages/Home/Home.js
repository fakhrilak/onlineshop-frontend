import React, { useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import word1 from "../../img/word1.png";
import word2 from "../../img/word2.png";
import word3 from "../../img/hello.png";
import word4 from "../../img/hello2.png";
import logo3 from "../../img/Background.png";
import { connect,useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive'

const Home = ({auth,location}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({
      type:"UPDATE_ROUTE",
      payload : location.pathname
    })
  },[])
  const {isAuthenticated} = auth
  const history = useHistory()
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  return (
    <div>
      {!isAuthenticated?
      <div className="relative w-11/12 lg:w-10/12 h-full bg-white m-auto">
        <div className="ml-2 pt-24">
          <div className="z-40">
            <img src={logo3} className="w-11/12 lg:w-12/12 mt-60 lg:mt-0" />
          </div>
          <div className="absolute top-8 w-full">
            {!isPortrait?<img src={word1} className="w-11/12 lg:w-5/12" />:
            <img src={word3} className="w-11/12 lg:w-5/12" />}
            {!isPortrait?<img src={word2} className="w-11/12 lg:w-5/12 mt-5 lg:mt-8" />:
            <img src={word4} className="w-11/12 lg:w-5/12 mt-5 lg:mt-8" />}
            <div className="w-12/12 m-auto pt-10 text-left md:text-center">
              <div className="w-44 ml-20 mr-24 lg:ml-0">
                <button className="border-green-300 border-2 text-green-400 rounded-lg w-full"
                onClick={()=>history.push("/kambing")}
                >
                  TAKE YOUR GOAT NOW
                </button>
              </div>
              </div>
          </div>
      </div>
     
      </div>:<Redirect to="/item"/>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Home);
