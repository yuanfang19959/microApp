
import { createRouter, createWebHashHistory } from "vue-router"
import Form from '../pages/onLineEntry/form.vue'
import Home from '../pages/home/index.vue'
import MoreList from '../pages/home/moreList.vue'
import HotlineAgent from '../pages/agent/hotlineAgent.vue'
import HeatingAgent from '../pages/agent/heatingAgent.vue'
import userSearch from '../pages/userSearch.vue'
import userConcat from '../pages/userConcat.vue'
import userDetail from '../pages/userDetail.vue'
import oneInsert from '../pages/onLineEntry/oneInsert.vue'
import pending from '../pages/wait/pending.vue'
import delayPending from '../pages/wait/delayPending.vue'
import DelayAgent from '../pages/agent/delayAgent.vue'
import insertDetail from '../pages/onLineEntry/insertDetail.vue'
import selectUser from '../pages/onLineEntry/selectUser.vue'


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
    {
        path: '/moreList',
        name: 'moreList',
        meta: {
            title:'菜单列表'
        },
        component: MoreList,
    },
    {
        path: '/form',
        name: 'form',
        meta: {
            title:'工单新建'
        },
        component: Form
    },
    {
        path: '/hotlineAgent',
        name: 'hotlineAgent',
        meta: {
            title:'热线待办'
        },
        component: HotlineAgent
    },
    {
        path: '/heatingAgent',
        name: 'heatingAgent',
        meta: {
            title:'供热待办'
        },
        component: HeatingAgent
    },
    {
        path: '/userSearch',
        name: 'userSearch',
        meta: {
            title:'供热用户查询'
        },
        component: userSearch
    },
    {
        path: '/userDetail',
        name: 'userDetail',
        meta: {
            title:'用户详情'
        },
        component: userDetail
    },
    {
        path: '/userConcat',
        name: 'userConcat',
        meta: {
            title:'员工通讯录'
        },
        component: userConcat
    },
    {
        path: '/oneInsert',
        name: 'oneInsert',
        meta: {
            title:'一线录入'
        },
        component: oneInsert
    },
    {
        path: '/insertDetail',
        name: 'insertDetail',
        meta: {
            title:'录入详情'
        },
        component: insertDetail
    },
    {
        path: '/selectUser',
        name: 'selectUser',
        meta: {
            title:'选择用户'
        },
        component: selectUser
    },
    {
        path: '/pending',
        name: 'pending',
        meta: {
            title:'待审批'
        },
        component: pending
    },
    {
        path: '/delayPending',
        name: 'delayPending',
        meta: {
            title:'延期审核'
        },
        component: delayPending
    },
    {
        path: '/delayAgent',
        name: 'delayAgent',
        meta: {
            title:'延期审核'
        },
        component: DelayAgent
    },
    
    {
        path: '/user',
        name: 'user',
        meta: {
            title:'户号'
        },
        component: () => import('@/pages/userlist.vue')
    },
    {
        path: '/openOrder',
        name: 'openOrder',
        meta: {
            title:'开通单详情'
        },
        component: () => import('@/pages/openOrder.vue')
    },
]

const router = new createRouter({
    history: createWebHashHistory(), 
    routes: routers
})

export default router