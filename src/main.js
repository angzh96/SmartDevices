import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import BMap from 'vue-baidu-map'
import axios from 'axios'
// import qs from 'qs';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.prototype.$ajax = axios
// axios.defaults.baseURL = '/api'
// Vue.use(axios);
// Vue.use(qs);
Vue.config.productionTip = false

Vue.use(BMap, {
  ak: 'Ngn6e8rSX0GWCAQNvQpD1NGccAKU6Gc8' // 这个地方是官方提供的ak密钥
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
