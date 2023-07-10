// import './assets/main.css'
// import './styles/reset.less'
// import 'normalize.css'
import './styles/common.scss'
import piniaPersistedState from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入懒加载插件
import { lazyPlugin } from './directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'

const app = createApp(App)
const pinia = createPinia()

// 注册持久化插件
pinia.use(piniaPersistedState)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')

