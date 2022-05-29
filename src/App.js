import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom"
import Dashboard from './pages/Dashboard/Dashboard'
import Sensor from './pages/Sensor/Sensor'
import ADD from "./pages/Form_add.js"
import StreamVideo from './pages/VideoStream/StreamVideo'
import Login from './pages/Auth/Login.js'
import Register from './pages/Auth/Register.js'
import Actuator from './pages/Actuator/Actuator'
import ActuatorPercobaan from './pages/ActuatorPercobaan/ActuatorPercobaan'
import Sidebar from './components/Sidebar/Sidebar'

import './App.css'
import { setAuthToken } from './config/API'
import { Provider } from "react-redux";
import store from "./redux/store/store"
import { loadUser } from './redux/actions/Auth'
import Controller from './pages/Controller/Controller'
import BeratBadan from './pages/Berat/MyGot'
import DetailGot from './pages/Berat/DetailGot'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import UserRoute from './components/Routes/UserRoute'
import Users from './pages/Users/Users'
import AdminRoutes from './components/Routes/AdminRoutes'
import Item from './pages/Item/Item'
import Order from './pages/Order/Order'
import AddClass from './pages/AddClass/AddClass'
import Transaksi from './pages/Transaksi/Transaksi'
import Profile from './pages/Profile/Profile'
import Suplier from './pages/Suplier/Suplier'
import Treeviews from './pages/Treeview/Treeviews'
import Notfound from './pages/NotFound/NotFound'



const App = () => {
  useEffect(()=>{
    console.log("mau load")
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
    <Router>
    <Navbar/>
 
      <div className="">
        <Sidebar>
          <div className="w-full mx-auto">
            <Switch>
                <AdminRoutes exact path="/sensor"  component={Sensor}/>
                <AdminRoutes exact path="/actuator"  component={Actuator}/>
                <AdminRoutes exact path="/components" component={ADD}/>
                <AdminRoutes exact path="/stream" component={StreamVideo}/>
                <AdminRoutes exact path="/control-timbangan" component={Controller}/>
                <AdminRoutes exact path="/investor" component={Users}/>
                <AdminRoutes exact path="/class" component={AddClass}/>
                <Route exact path="/suplier" component={Suplier}/>
                <AdminRoutes exact path="/hirarki" component={Treeviews}/>
                
                <Route exact path="/item" component={Item}/>
                <Route exact path="/detail-mygot/:id" component={DetailGot}/>
                <UserRoute exact path="/dashboard" component={Dashboard}/>
                <UserRoute exact path="/my-got" component={BeratBadan}/>
                <UserRoute exact path="/order" component={Order}/>
                <UserRoute exact path="/transaksi" component={Transaksi}/>
                <UserRoute exact path="/profile" component={Profile}/>


                <Route exact path="/login" component ={Login}/>
                <Route exact path="/register" component ={Register}/>
                <Route exact path="/" component={Home}/>
                <Route path='*' exact={true} component={Notfound} />
            </Switch>
          </div>
        </Sidebar>
      </div>    
    </Router>
    </Provider>
  )
}

export default App

