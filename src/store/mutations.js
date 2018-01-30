import * as types from './types.js'
//注意，mutations中的方法必须时同步的
const mutations = {
    [types.LOGIN] : (state, data)=>{
        state.token = data;
        window.sessionStorage.setItem('token',data)
    },
    [types.LOGOUT] : (state, data)=>{
        state.token = null;
        window.sessionStorage.removeItem('token')
    }
};

export default mutations;