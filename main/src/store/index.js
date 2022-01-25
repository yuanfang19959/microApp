import { createStore } from 'vuex'

export default createStore({
    state: {
        username: "主框架数据-测试001"
    },
    mutations: {
        setUsername(state) {
            state.username = state;
        }
    },
    actions: {

    },
    getters: {
        // 获取到最终的数据结果
        getUser(state) {
            return state.username
        }
    }
})
