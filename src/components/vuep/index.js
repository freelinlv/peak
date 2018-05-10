import Vuep from './components/playground'
// import 'element-ui/lib/theme-chalk/index.css'
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/mode/simple'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import Vue from 'vue'
// import ElementUI from 'element-ui'
Vuep.config = function (opts) {
  Vuep.props.options.default = () => opts
}
function install (Vue, opts) {
  Vuep.config(opts)
  Vue.component(Vuep.name, Vuep)
}

Vuep.install = install

if (typeof Vue !== 'undefined') {
  Vue.use(install) // eslint-disable-line
}

export default Vuep
