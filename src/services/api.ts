import axios from 'axios';

const api = axios.create({
  baseURL: process.env.MONGODB_URI,
});

let countReq = 0;

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    if (config.method === "get") {
      ++countReq;
    }
    console.log(
      `Já tivemos ${countReq} requisições do tipo ${config.method}`
    );
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
