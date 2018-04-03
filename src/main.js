import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/app.css'
import '../static/css/hover.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.min.css'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/default.css'
import VueClipboard from 'vue-clipboard2'
// import VueHighlightJS from 'vue-highlightjs'

import('./routes').then(routes => {
  const routeArray = routes.default
  Vue.use(ElementUI)
  Vue.use(VueRouter)
  Vue.use(VueHighlightJS)
  Vue.use(VueClipboard)
  // Vue.use(VueHighlightJS)
  const router = new VueRouter({
    routes: routeArray
  })
  let vm = new Vue({
    router,
    el: '#app',
    render: h => h(App)
  })
  Vue.use({
    vm
  })
})
