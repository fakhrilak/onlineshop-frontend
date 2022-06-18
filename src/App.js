import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom"
import Login from './pages/Auth/Login.js'
import Register from './pages/Auth/Register.js'
import Sidebar from './components/Sidebar/Sidebar'

import './App.css'
import { setAuthToken } from './config/API'
import { Provider } from "react-redux";
import store from "./redux/store/store"
import { loadUser } from './redux/actions/Auth'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import UserRoute from './components/Routes/UserRoute'
import Item from './pages/Item/Item'
import Transaksi from './pages/Transaksi/Transaksi'
import Profile from './pages/Profile/Profile'
import Notfound from './pages/NotFound/NotFound'
import AddItem from './pages/AddItem/AddItem.js'
import Order from './pages/Order/Order.js'



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
                <Route exact path="/item" component={Item}/>
                <UserRoute exact path="/transaksi" component={Transaksi}/>
                <UserRoute exact path="/profile" component={Profile}/>
                <UserRoute exact path="/order" component={Order}/>

                <Route exact path="/login" component ={Login}/>
                <Route exact path="/additem" component ={AddItem}/>
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

