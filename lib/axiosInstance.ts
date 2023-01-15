import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  // timeout: 1000,
  // headers: {
  //   'content-type': 'application/json',

  // },
  withCredentials: true,
});

export default axiosInstance;