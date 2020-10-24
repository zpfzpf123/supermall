import axios from 'axios';
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout:5000
    })
    // 过滤器(拦截器)
    instance.interceptors.response.use(res => {
        return res.data
    })
    return instance(config) //返回的是一个promise
}
