import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SensorType from "../../components/Graph/SensorType/SensorType";
import SensorCurrent from "../Sensor/SensorCurrent";
import Sidebar from "../../components/Sidebar/Sidebar";
import CardCombined from "../../components/Card/CardCombined";
import StreamVideo from "../VideoStream/StreamVideoDashboard";
import Treeviews from "../Treeview/Treeviews";
import dayjs from "dayjs"
import { connect,useDispatch } from "react-redux";
import { API, config } from '../../config/API'
import Graphin , { Utils }from '@antv/graphin';
// import {} from "@grafana/ui"
// import Carousel from "react-elastic-carousel"
import SensorFromGRafana from "../Sensor/SensorGrafanaEmbed.js"
const DashboardAdmin = ({auth}) => {
  const [data,setData] = useState()
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch({
  //     type:"UPDATE_ROUTE",
  //     payload : location.pathname
  //   })
  // },[])
  useEffect(()=>{
    API.get("/perkawinan",config)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
  },[])
  return (
    <>
      <div className="h-full pt-2 w-full lg:w-9/12 md:ml-80">
            
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {}) (DashboardAdmin)
