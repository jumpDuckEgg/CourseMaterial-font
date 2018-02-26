import * as types from './types.js'

const actions = {
    UserLogin({ commit }, data) {
        commit(types.LOGIN, data)
    },
    UserLogout({ commit }, data) {
        commit(types.LOGOUT, data)
    },
    UserUpdateLogo({ commit }, data) {
        commit(types.UPDATELOGO, data)
    }
};

export default actions;