import Vue from 'vue'
import Vuex from 'vuex'
import App from './modules/App/'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        App
    },
    strict: process.env.NODE_ENV !== 'production' //是否开启严格模式
})

export default store
