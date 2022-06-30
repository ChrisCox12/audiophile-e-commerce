import axios from 'axios';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

//  creates an axios instance that can be used across the application
const axiosInstance = axios.create({ baseURL: REACT_APP_API_URL });

//  by using interceptors, ensures that authorization header is set before every request
axiosInstance.interceptors.request.use(
    function(config) {
        if(localStorage.getItem('audiophile_admin_token')) {
            config.headers['authorization'] = `Bearer ${localStorage.getItem('audiophile_admin_token')}`;
        }
        
        return config;
    }, 
    function(error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;