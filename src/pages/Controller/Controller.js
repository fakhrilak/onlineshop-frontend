import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Socket } from "../../config/API";
import Sidebar from "../../components/Sidebar/Sidebar";

const Controller = (props) => {
  const { login } = props;
  const { users } = login;
  const [triger, setTriger] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("Tap ID Card Kambing");
  useEffect(() => {
    if (users) {
      Socket.emit("SendStatus", { id_User: users._id });
    }
  }, [users, triger]);
  useEffect(() => {
    if (users) {
      Socket.on("MyStatus" + users._id, (data) => {
        console.log("ini status", data)
        setStatus(data.mode);
      });
      Socket.on("ResTimbangan" + users._id, (data) => {
        setMessage(data.message);
      });
    }
  }, []);
  const setMode = () => {
    // const data = {
    //   value: status == 1 ? 0 : 1,
    //   _id: users._id,
    // }
    // console.log(data)
    // Socket.emit("SetTimbangan",data);

      setTriger(!triger);
    
  };
  return (
    <>
    <div className="w-8/12 bg-white ml-auto mr-auto mt-20 rounded-lg lg:pl-80 text-center">
        <button className="bg-emerald-700 rounded-md p-3 w-44 border-2 m-auto text-white"
          onClick={() => setMode()}
        >
          UBAH MODE
        </button>
        <p className="mt-8">
          MODE : <br/>
          {" "}
          <strong className="text-lg">{status == 0 ? "TIMBANGAN" : "TAGING"}</strong>
        </p>

        <p className="mt-8">{message}</p>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  login: state.auth,
});

export default connect(mapStateToProps, {})(Controller);
