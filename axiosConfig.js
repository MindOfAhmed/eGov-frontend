import axios from 'axios';

// intercept requests and attach the access token
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');  // get access token from local storage
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;  // attach token to request headers
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);