import {createStore} from "vuex"

export default createStore({
    state: {
        show: false
    },
    getters: {},
    mutations: {
        setShow(state, value) {
            state.show = value
        },
    },
    actions: {},
    modules: {}
})