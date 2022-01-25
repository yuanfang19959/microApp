import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';
import store from './store/index';
import '../qiankun'


const app = createApp(App);

router.beforeEach((to, from, next) => {
   document.title = to.meta.title || '微前端' 
   next()
})

app.use(router).use(store)

app.mount('#app')
