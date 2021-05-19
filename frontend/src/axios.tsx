import axios from 'axios'

const baseURL: string = 'http://127.0.0.1/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('acess_token')
        : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
})

export default axiosInstance