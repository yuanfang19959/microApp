import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes/index'
import { createRouter, createWebHistory } from "vue-router"
import actions from './send/index'

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let instance = null;
let router = null;

const render = (props) => {
  let { container } = props;

  // if (container) {
  //   actions.setActions(props)
  // }

  router = new createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app-vue' : '/'),
    routes: routes,
  })

  instance = createApp(App).use(router).mount(container ? container.querySelector("#app") : "#app");
};

if (!__qiankun__) {
  render({})
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  console.log(actions)
  actions.setActions(props)
  render(props);
}

export async function unmount() {
  instance.$destroy?.();
  instance = null;
}