import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    // storage: window.localStorage
})

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        lastUrl: ''
    },
    mutations: {
        setToken(state, newToken) {
            state.token = newToken
        },
        setLastUrl(state, url) {
            state.lastUrl = url
        }
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getLastUrl: state => {
            return state.lastUrl
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store