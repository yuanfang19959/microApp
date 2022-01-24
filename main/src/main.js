import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';
import '../qiankun'

const app = createApp(App);

router.beforeEach((to, from, next) => {
   document.title = to.meta.title
   next()
})

app.use(router)

app.mount('#app')
