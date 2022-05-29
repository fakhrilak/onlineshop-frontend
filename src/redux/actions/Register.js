// import {API, config} from "../../config/API"

 
// export const SignUp = (username, email, password) => async(dispatch) => {
//     try {
//         const body = {
//             username: username,
//             email: email,
//             password: password
            
//         }

//         const res = await API.post("/register", body,config)
//         console.log(res.data, "test");
        
//         dispatch({
//             type: "USERS_CREATE",
//             payload: res.data
//         });
  
        
//     }catch(err) {
        
        
//     }
// }