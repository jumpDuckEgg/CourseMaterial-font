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
    baseURL: config.SERVERADDR,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

axios.interceptors.request.use = instance.interceptors.request.use;

//requset拦截器
instance.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
            config.headers.userInfo = `user_id ${store.state.user_id} user_type ${store.state.user_type} username ${store.state.username}`
        }
        
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
//response拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    store.dispatch('UserLogout');
                    // vm.$notify({
                    //     type:'warning',
                    //     message:'登录信息已过期，请重新登陆'
                    // })
                    alert('登录信息已过期，请重新登陆');
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                case 408:
                    store.dispatch('UserLogout'); //可能是token过期，清除它
                    // vm.$notify({
                    //     type: 'warning',
                    //     message: '用户信息不正确，请重新登录'
                    // });
                    alert('用户信息不正确，请重新登录');
                    router.replace({ //跳转到登录页面
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
                    break;
            }
        }
        return Promise.reject(error.response)
    }

)
export default instance;