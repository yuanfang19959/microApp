import { createStore } from 'vuex'

export default createStore({
    state: {
        username: "主框架数据-测试001",
        msg:""
    },
    mutations: {
        setUsername(state, paylod) {
            state.username = paylod;
        },
        setMsg(state, paylod) {
            state.msg = paylod;
        }
    },
    actions: {

    },
    getters: {
        // 获取到最终的数据结果
        getUser(state) {
            return state.username
        },
        getMsg(state) {
            return state.msg
        }
    }
})
