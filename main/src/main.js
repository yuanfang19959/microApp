import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';
import store from './store';
import '../qiankun'
import '../qiankunState'

const app = createApp(App);

router.beforeEach((to, from, next) => {
   document.title = to.meta.title
   next()
})

app.use(router).use(store)

app.mount('#app')
