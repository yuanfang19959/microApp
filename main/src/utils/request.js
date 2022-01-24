import axios from "axios";
import { BASEURL } from "./api";
import store from '../store'

const service = axios.create({
    baseURL: BASEURL,
    timeout: 5000,
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}  //设定的请求头
    headers: {'Content-Type': 'application/json;charset=UTF-8'}  //设定的请求头
})

// request interceptor 请求拦截
service.interceptors.request.use(
    function (config) {
        // 处理响应成功数据
        store.commit('setShow',true)
        return config;
    },
    function (error) {
        // 处理响应错误
        return Promise.reject(error);
    }
);

// response interceptor 响应拦截
service.interceptors.response.use(
    function (response) {
        // 处理响应成功数据
        store.commit('setShow',false)
        return response;
    },
    function (error) {
        // 处理响应错误
        store.commit('setShow',false)
        return Promise.reject(error);
    }
);

export {
    service
}
