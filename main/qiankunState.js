import { initGlobalState } from 'qiankun';
import {  useStore } from 'vuex';

const initialState = {
    user: {
        name: 'qiankun'
    }
};
const store = useStore();
console.log(initialState)

// 存放所有应用state
const actions = initGlobalState(initialState);

actions.onGlobalStateChange((state, prev) => {
    console.log(prev)
    for (const key in state) {
        initialState[key] = state[key];
    }
    store.commit('setUsername', state)
    // console.log(store.getters.getUser)

});
// actions.setGlobalState(state);
// actions.offGlobalStateChange();
