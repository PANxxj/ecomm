// axiosInstance.js
import axios from "axios";

// const url = '/api/v1/'
const url = 'http://127.0.0.1:8000/api/v1/'

const instance = axios.create({
    baseURL: url,
});

// Set up request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token !== null) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Set up response interceptor
instance.interceptors.response.use(
    (response) => {
        // Do something with response data
        // console.log(response);
        return response;
    },
    (error) => {
        // Do something with response error
        // console.log(error);
        if (!error.response) {
            // handle error
        } else if (error.response.status === 403) {
            // handle error
        } else if (error.response.status === 401) {
            // handle error
        } else {
            // handle error
        }
        return Promise.reject(error);
    }
);

export default instance;


