import SocketIOClient from "socket.io-client"
import axios from 'axios';

//public dev
// export const socketURL = "https://kambing.zilog.club/"
// export const BaseURL = "https://kambing.zilog.club/kambing/"

//public prod
// export const socketURL = "https://kambing-server.kebonbinatang.org/"
// export const BaseURL = "https://kambing-server.kebonbinatang.org/kambing/"
// export const streamURL = "wss://kambing-stream.kebonbinatang.org/"

//local dev
// export const socketURL = "http://192.168.10.160:3004/"
// export const BaseURL = "http://192.168.10.160:3004/kambing"

//local prod
export const socketURL = "https://trymulti.zilog.club/"
export const BaseURL = "http://v2-blogger-server.zilog.club:4200/onlineshop/v1"
export const streamURL = "https://trymulti.zilog.club/"
// export const socketURL = "wss://192.168.20.160:5000/"

// proxy_set_header Upgrade $http_upgrade;
//     proxy_set_header Connection "upgrade";
export const Socket = SocketIOClient(socketURL)
export const API = axios.create({
  baseURL: BaseURL
});

export const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};
