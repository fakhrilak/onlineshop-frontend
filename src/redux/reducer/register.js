// const initialState = {
//     userregist: null,
//     username:'',
//     email: '',
//     password: '',
//     message: '',
//     loading: true,
//     isRegister: false,
// };

// export default function (state = initialState, action) {
//     const {type, payload} = action;
    
//     switch (type) {
//         case "USERS_CREATE":
//             localStorage.setItem("token", payload.token)
//             console.log(payload, "lihat")
//             return {
//                 ...state,
//                 username: payload.username,
//                 email: payload.email,
//                 password: payload.password,
//                 loading: false,  
//                 isRegister: true,             
//             }
//         case "LOGOUT":
//             localStorage.removeItem('token')
//             return {
//                 ...state,
//                 userregist: null,
//                 isLogin:false,
//             }
//             default:
//                 return state;
//     }
// }