import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// const app = createApp(App)

// app
// app.mount('#app')


createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
