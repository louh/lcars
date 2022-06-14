import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createRouter, createWebHistory } from 'vue-router'
import { setupResizeObserver } from './utils/resize-observer'
import App from './App.vue'

const routes = [
  { path: '/', component: App },
  // TODO: Make other routes
  // { path: '/about', component: App },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp({})
app.use(router)
app.mount('#app')

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.unmount()
  })
}

setupResizeObserver()
