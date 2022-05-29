import React from "react";
import { createPopper } from "@popperjs/core";
import  User from '../../img/User.jpg'
import Goat from "../../img/Goat.png";
import {connect,useDispatch} from "react-redux"
import {BaseURL} from "../../config/API"
import {useHistory} from "react-router-dom"

const UserDropdown = ({ auth,order }) => {
  const {users} = auth
  const dispatch = useDispatch()
  const history = useHistory()
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
        {users ?<span className="w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg h-full"
              src={BaseURL+"/single/"+users.avatar}
            />
          </span>:
          <span className="w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-full">
          <img
            alt="..."
            className="w-full rounded-full align-middle border-none shadow-lg h-full"
            src={Goat}
          /></span>
          }
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {users ?<a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal text-center block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=>dispatch({
            type:"LOGOUT"
          })}
        >
          LOGOUT
        </a>:
        <>
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal text-center block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=>history.push("/login")}
        >
          LOGIN
        </a>
        <div className="w-8/12 m-auto h-0 border border-solid border-blueGray-100" />
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal text-center block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=>history.push("/register")}
        >
          REGISTER
        </a>
        </>
        }
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, {})(UserDropdown);
