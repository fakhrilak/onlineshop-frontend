import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./Type"

import {API,config,setAuthToken} from "../../config/API"

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await API.get("/auth",config);
    console.log(res,"ini load user")
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const SignUp = (firstname,lastname, email, password) => async(dispatch) => {
  try {
      const body = {
          firstname: firstname,
          lastname:lastname,
          email: email,
          password: password       
      }

      const res = await API.post("/register", body,config)
      console.log(res.data, "test");
      
      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      });
      dispatch(loadUser())
      window.location.reload("/item")
  }catch(err) {
    console.log(err.response,"register")
      dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data
      })     
  }
}

export const loginAction = (email, password) => async(dispatch) => {
    try {
        const body = {
            email: email,
            password: password
        }

        const res = await API.post("/login", body,config)
        console.log(res,"===================== RES LOGIN")
        localStorage.setItem("token",res.data.data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data,
        });
        dispatch(loadUser())
        window.location.reload("/item")
    }catch(err) {
        console.log(err)
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response,
        })
    }
}

// export const LOGOUT = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_PROFILE,
//   })
//   dispatch({
//     type: LOGOUT,
//   })
// }