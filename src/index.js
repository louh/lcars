import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { initSounds } from './utils/sounds'
import { setupResizeObserver } from './utils/resize-observer'
import App from './App.vue'
import Transmission from './Transmission.vue'
import OmegaDirective from './OmegaDirective.vue'
import './styles/index.css';
import './styles/typography.css';

const pinia = createPinia()

const routes = [
  { path: '/', component: App },
  { path: '/transmission', component: Transmission },
  { path: '/omega-directive', component: OmegaDirective },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

initSounds()

const app = createApp({})
app.use(pinia)
app.use(router)
app.mount('#app')

setupResizeObserver()
