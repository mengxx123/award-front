import axios from 'axios'
import {apiDomain} from '@/config'

// axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    alert(11)
    return config;
}, function (error) {
    // Do something with request error
    alert(12)
    return Promise.reject(error);
});

axios.interceptors.request.use(
    config => {
        console.log('请求了')
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        alert(13)
        console.log('错误了')
        return Promise.reject(err);
    });

// http response 拦截器

axios.interceptors.response.use(
    response => {
        alert(14)
        console.log('响应了')
        return response
    },
    error => {
        alert(15)
        console.log('错误了')
        if (error.response) {
            switch (error.response.status) {
                case 401: // 旌旗  灵医 , 只用[授权] 旌旗的医生 才是 灵医

                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT)
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })
const instance = axios.create({
    baseURL: apiDomain
    // withCredentials: true
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    //     console.log('呵呵')
    //     console.log(data)
    //     return data;
    // }],
})

export default instance
