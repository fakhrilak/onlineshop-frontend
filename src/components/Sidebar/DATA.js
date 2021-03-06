import dashbord from "../../img/dashboard.png"
import weight from "../../img/weight.png"
import profile from "../../img/profile.png"
import goat from "../../img/goat.png"
import order from "../../img/order.png"
import transaction from "../../img/transaction.png"

export const sidebarAdmin = [
    {
        name : "ITEMS",
        route : "/item"
    },
    {
        name : "ENABLED ITEMS",
        route : "/enableditems"
    },
    {
        name : "PROFILE",
        route : "/profile"
    },
    {
        name : "TRANSAKSI",
        route : "/transaksi"
    },
    {
        name : "ADD ITEM",
        route : "/additem"
    }
]
export const notAllowed = ["/register","/","/login"]
export const sidebarUser = [
    {
        name : "ITEM",
        route : "/item"
    },
    {
        name : "PROFILE",
        route : "/profile"
    },
    {
        name : "TRANSAKSI",
        route : "/transaksi"
    }
]