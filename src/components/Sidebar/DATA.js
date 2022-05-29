import dashbord from "../../img/dashboard.png"
import weight from "../../img/weight.png"
import profile from "../../img/profile.png"
import goat from "../../img/goat.png"
import order from "../../img/order.png"
import transaction from "../../img/transaction.png"

export const sidebarAdmin = [
    {
        name : "DASHBOARD",
        route : "/dashboard"
    },
    {
        name : "HIRARKI",
        route : "/hirarki"
    },
    {
        name : "PROFILE",
        route : "/profile"
    },
    {
        name : "SUPLIER",
        route : "/suplier"
    },
    {
        name: "SENSOR",
        route : "/sensor"
    },
    {
        name:"ACTUATORS",
        route:"/actuator"
    },
    {
        name : "WEIGHT",
        route : "/my-got"
    },
    {
        name : "CCTV",
        route:"/stream"
    },
    {
        name : "CONTROLLER",
        route :"/control-timbangan"
    },
    {
        name : "INVESTOR",
        route : "/investor"
    },
    {
        name : "KAMBING",
        route : "/kambing"
    },
    {
        name  : "CLASS",
        route : "/class"
    },
    {
        name : "TRANSAKSI",
        route:"/transaksi"
    },
    {
        name: "COMPONENST",
        route:"/components"
    }
]
export const notAllowed = ["/register","/","/login"]
export const sidebarUser = [
    {
        name : "DASHBOARD",
        route : "/dashboard",
        state : false,
        img : dashbord
    },
    {
        name : "PROFILE",
        route : "/profile",
        state : true,
        img : profile
    },
    {
        name : "WEIGHT",
        route : "/my-got",
        state : true,
        img : weight
    },
    {
        name : "KAMBING",
        route : "/kambing",
        state : false,
        img : goat
    },
    {
        name : "TRANSAKSI",
        route : "/transaksi",
        state : true,
        img : transaction
    },
    {
        name : "ORDER",
        route : "/order",
        state:true,
        img : order
    }
]