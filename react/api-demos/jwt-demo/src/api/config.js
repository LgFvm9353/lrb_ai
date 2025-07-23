import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5173/api'
// 拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token') || '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 使用Bearer token格式
        }
        // Bearer ‘持有者’ 表示只要持有这个token的人，就被认为是经过授权的
        // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDAxIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE3NTMyNDEzMzcsImV4cCI6MTc1MzI0ODUzN30.WhAf7u-tFsLl_S35u4IDp_paJrmdWbOpVRq5hHVt4s0`
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default axios;