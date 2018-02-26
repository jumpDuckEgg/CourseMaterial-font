import * as types from './types.js'
//注意，mutations中的方法必须时同步的
const mutations = {
    [types.LOGIN]: (state, data) => {
        state.token = data.token;
        state.user_type = data.userType;
        state.userImage = data.userImage;
        state.username = data.username;
        state.user_id = data.user_id;
        window.sessionStorage.setItem('token', data.token);
        window.sessionStorage.setItem('user_type', data.userType);
        window.sessionStorage.setItem('userImage', data.userImage);
        window.sessionStorage.setItem('username', data.username);
        window.sessionStorage.setItem('user_id', data.user_id);
    },
    [types.LOGOUT]: (state, data) => {
        state.token = null;
        state.user_type = null;
        state.userImage = null;
        state.username = null;
        state.user_id = null;
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user_type');
        window.sessionStorage.removeItem('userImage');
        window.sessionStorage.removeItem('username');
        window.sessionStorage.removeItem('user_id');
    },
    [types.UPDATELOGO]: (state, data) => {
        state.userImage = data.userImage;
        window.sessionStorage.setItem('userImage', data.userImage);
    }
};

export default mutations;