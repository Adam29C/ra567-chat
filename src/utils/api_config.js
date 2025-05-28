import axios from 'axios';
// export const base_url = 'http://192.168.1.19:9000';
// export const base_url = 'https://codehubit.in';
export const base_url = 'https://zuba.minidog.club';
// export const base_url = 'http://3.250.174.141:7806';

const dataservice = axios.create({
  baseURL: base_url,
});

dataservice.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default dataservice;
