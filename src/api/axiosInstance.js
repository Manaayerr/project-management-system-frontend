import axios from "axios";

const baseURL = 'http://localhost:8000/api/'; 

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request Interceptor لإضافة الـ Access Token
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Response Interceptor لتجديد التوكن تلقائيًا
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // منع حلقة لا نهائية
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const res = await axios.post(`${baseURL}token/refresh/`, {
                        refresh: refreshToken,
                    });

                    localStorage.setItem('access_token', res.data.access);

                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;

                    return axiosInstance(originalRequest);
                } catch (err) {
                    // فشل التجديد => تسجيل خروج المستخدم
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('username');
                    window.location.href = '/';
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
