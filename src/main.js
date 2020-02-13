// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
// import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import promise from 'es6-promise'
import * as filters from './utils/filters'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './asyncRouter' //

const Vue = require('vue')
const IwaysUI = require('iways-ui')
// const ElementUI = require('element-ui')

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

promise.polyfill()
Vue.use(IwaysUI, { size: 'mini' })
// Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
