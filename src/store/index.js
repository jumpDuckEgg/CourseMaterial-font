import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex);

const state = {
    token:window.sessionStorage.getItem('token'),
    username:""
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})

