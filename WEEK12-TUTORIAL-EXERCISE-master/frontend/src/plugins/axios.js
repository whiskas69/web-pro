import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3002',
})
// ก่อนที่จะยิง request จะแนบ headers ไปด้วย
instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
