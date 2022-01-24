

import Home from '../page/home.vue'
import Ass from '../page/ass.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title:'首页'
        },
        component: Home,
    },
    {
        path: '/ass',
        name: 'ass',
        meta: {
            title:'艾斯'
        },
        component: Ass,
    },
]
console.log(window.__POWERED_BY_QIANKUN__ )


export default routes
