// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import '@UTIL/prototype'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import '../css/main.scss'

// UI 組件
import iView from './components/iViewMain'
import locale from 'iview/dist/locale/zh-TW'
import '../css/my-theme.less'

import VueRx from 'vue-rx'
// vue rxjs
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
// import 'rxjs/add/observable/fromEvent'
// import 'rxjs/add/operator/bufferTime'
// import 'rxjs/add/operator/filter'
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/share'
// import 'rxjs/add/operator/throttleTime'
Vue.use(iView, { locale })
Vue.use(VueRx, { Observable, Subscription })

Vue.config.productionTip = false
Vue.prototype.tempDate = {}
const vue$ = new Vue({
    el: '#app',
    router,
    store,
    render: createElement => createElement(App)
})

// const data = [4.7, 4.8, 4.9, 5.0, 5.1, 5.2]
// const rd = () => data[Math.floor(Math.random() * 6 + 1) - 1]
// let obj = {}
// ;[...Array(5000).keys()].forEach((i) => {
//     let float = 0
//     let arg = 0
//     ;[...Array(139).keys()].forEach((i) => {
//         float += rd()
//     })
//     arg = (float / 139).toFixed(2)
//     obj[arg] = ++obj[arg] || 1
// })
// console.log(obj)