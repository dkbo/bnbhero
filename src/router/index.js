import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HeroCalc',
            meta: {
                title: '英雄計算'
            },
            component: r => require.ensure([], () => r(require('@V/HeroCalc')), 'HeroCalc')
        },
        // {
        //     path: '/CalcGF',
        //     name: 'CalcGF',
        //     meta: {
        //         title: '四圍算檔次'
        //     },
        //     component: r => require.ensure([], () => r(require('@V/CalcGF')), 'CalcGF')
        // },
        {
            path: '/ThreeBrother',
            name: 'ThreeBrother',
            meta: {
                title: '猜謎三兄弟'
            },
            component: r => require.ensure([], () => r(require('@V/ThreeBrother')), 'ThreeBrother')
        }
    ]
})
export default router
