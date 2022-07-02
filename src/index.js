import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createRouter, createWebHistory } from 'vue-router'
import { setupResizeObserver } from './utils/resize-observer'
import App from './App.vue'
import Transmission from './Transmission.vue'
import './styles/index.css';
import './styles/typography.css';

const routes = [
  { path: '/', component: App },
  { path: '/transmission', component: Transmission },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp({})
app.use(router)
app.mount('#app')

setupResizeObserver()
