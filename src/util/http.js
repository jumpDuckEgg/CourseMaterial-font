import axios from 'axios';
import vm from '../main.js';
import config from '../config.js'
import store from '../store/index.js'
import router from '../router/index.js'
import { error } from 'util';
//设置全局axios默认值
axios.defaults.timeout = 5000;//5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建一个axios实例
const instance = axios.create({
    baseURL:config.SERVERADDR,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

axios.interceptors.request.use = instance.interceptors.request.use;

//requset拦截器
instance.interceptors.request.use(
    config =>{
        if(store.state.token){
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
)
//response拦截器
instance.interceptors.response.use(
    response =>{
        return response;
    },
    error => {
        if(error.response){
            switch(error.response.status){
                case 401:
                    store.dispatch('UserLogout');
                    // vm.$notify({
                    //     type:'warning',
                    //     message:'登录信息已过期，请重新登陆'
                    // })
                    router.replace({
                        path:'/login',
                        query:{
                            redirect: router.currentRoute.fullPath
                        }
                    })
            }
        }
        return Promise.reject(error.response)
    }

)
export default instance;