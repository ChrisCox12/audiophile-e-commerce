import axios from 'axios';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
//const REACT_APP_API_URL = 'http://localhost:8000/';
let headers = {};


if(localStorage.getItem('audiophile_admin_token')) {
    //  sets authorization header for token authentication
    headers.authorization = `Bearer ${localStorage.getItem('audiophile_admin_token')}`;
}


//  creates an axios instance that can be used across the application
const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: headers
});


export default axiosInstance;