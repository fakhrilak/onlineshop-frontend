/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Goat from "../../img/logo-goat.png";
import {sidebarAdmin,sidebarUser,notAllowed} from "./DATA"
import { FaInstagram,FaWhatsapp,FaYoutube } from 'react-icons/fa';
import "./Sidebar.css"

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useMediaQuery } from 'react-responsive'

const Sidebar = (props) => {
  const { users, isAuthenticated, role,route } = props.auth;
  const {order} = props.order
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 1100px)' })
  const halper=(location)=>{
    for(let i = 0;i<notAllowed.length;i++){
      if(location == notAllowed[i]){
        return false
      }
    }
    return true
  }
  return (
      <div>
        {halper(route) == true && <nav className="bg-green-300 lg:left-0 lg:block lg:fixed md:top-0 lg:bottom-0 lg:overflow-y-hidden lg:flex-row lg:flex-nowrap lg:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-2 pt-4 px-2 ">
          <div className="lg:flex-col lg:items-stretch text-center lg:min-h-full lg:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            <button
              className="bg-black cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="w-56 m-auto">
              <img
                className="hidden md:block w-3/6 h-3/6 m-auto rounded-none"
                src={Goat}
              />
            </div>
            <Link
              className="md:block md:pb-2 text-lg text-blueGray-600 mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0"
              to="/"
            >
              Kandang 4.0
            </Link>
            <ul className="md:hidden flex flex-wrap list-none justify-end">
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>

            <hr className="my-4 md:w-10/12 m-auto" />
            
            <div
              className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              <div className="h-15 md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                      to="/"
                    >
                      Kandang 4.0
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {isTabletOrMobile && <div className="bg-green-300 w-2/6 top-0 right-0 h-96 absolute"/>}
              <div id="inner">
              <ul className="text-center md:flex-col md:min-w-full flex flex-col justify-start list-none px-4 h-80 overflow-y-auto">
                {role == "1" ? sidebarAdmin.map((data,index)=>(
                  <li className="md:text-left" key={index}>
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/settings") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to={data.route}
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/settings") !== -1
                          ? "opacity-75"
                          : "text-green-500")
                      }
                    ></i>{" "}
                    {data.name}
                  </Link>
                </li>
                )):role == "2"? sidebarUser.map((data,index)=>(
                  <li className="md:text-left" key={index}>
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to={data.route}
                  >
                    <div className="grid grid-cols-3">
                      <div className="w-5 h-5 m-auto">
                        <img src={data.img}
                        className="w-5 h-5"
                        />
                      </div>                    
                      <div className="col-span-2">
                        <a> {data.name}{data.name == "ORDER" && order.order ? " "+order.order.length:null}</a>
                      </div>                     
                    </div>
                  </Link>
                  </li>
                )):<li className="md:text-left">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/kambing"
                >
                  <div className="grid grid-cols-3">
                      <div className="w-5 h-5 m-auto">
                        <img src={Goat}
                        className="w-5 h-5"
                        />
                      </div>                    
                      <div className="col-span-2">
                        <a>KAMBING</a>
                      </div>                     
                    </div>
                </Link>
                </li>}
              </ul></div>
            </div>
          </div>
        </nav>}
        <div className="rounded-lg w-full">
              <div className="">
                {props.children}
              </div>
              {halper(route) == true && 
              <div className="w-full lg:w-9/12 lg:ml-80 mt-44 bg-green-300 text-center rounded-tl rounded-tr bottom-0">
                  <div className="w-3/6 grid grid-cols-3 gap-2 m-auto pt-5 text-center">
                      <a><FaYoutube
                      className="w-3/6 h-3/6 m-auto"
                      /></a>
                      <a><FaInstagram 
                      className="w-3/6 h-3/6 m-auto"
                      /></a>
                      <a href="https://wa.me/6281299243859"><FaWhatsapp
                      className="w-3/6 h-3/6 m-auto "
                      /></a>
                  </div>
                  <div className="border-1 border-black w-9/12 m-auto"/>
                  <div className="font-bold text-1xl">
                     <p>© 2021 PT. AGRAPANA TEKNOLOGI INDONESIA</p>
                  </div>
              </div>}
        </div>
      </div>
)};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, {})(Sidebar);
