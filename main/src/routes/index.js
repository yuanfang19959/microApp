
import { createRouter, createWebHistory } from "vue-router"
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
    history: createWebHistory(), 
    routes: routers
})

export default router
