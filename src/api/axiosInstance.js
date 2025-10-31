import axios from "axios";

const baseURL = 'http://127.0.0.1/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});


axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;