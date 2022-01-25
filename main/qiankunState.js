import { initGlobalState } from "qiankun";
import store from './src/store/index'

const initialState = {
    //这里写初始化数据
    msg: "$$$$$$",
    type: ''
};


// 初始化 state
const actions = initGlobalState(initialState);
actions.onGlobalStateChange((state, prev) => {//监听公共状态的变化
    if (state.type === "open@@@") {
        console.log(location)
        location.pathname = '/app-react'
    }
    console.log("主应用: 变更前");
    console.log(prev);
    console.log("主应用: 变更后");
    console.log(state.msg);
    store.commit('setMsg', state.msg);//这里我把公共状态存到主应用的vuex里了
});

export default actions;