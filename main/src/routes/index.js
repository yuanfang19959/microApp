
import { createRouter, createWebHashHistory } from "vue-router"
import Home from '../page/home.vue'


const routers = [
    {
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title:'首页'
        },
        component: Home,
    },
]

const router = new createRouter({
    history: createWebHashHistory(), 
    routes: routers
})

export default router
