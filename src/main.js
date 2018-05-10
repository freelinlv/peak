import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/style.scss'
import '../static/css/app.scss'
import '../static/css/hover.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.min.css'
import VueClipboard from 'vue-clipboard2'
// import VueHighlightJS from 'vue-highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'
import './components/vuep/index.js'
import './components/vuep/style/vuep.scss'
import('./routes').then(routes => {
  const routeArray = routes.default
  Vue.use(VueRouter).use(ElementUI).use(VueClipboard)
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
