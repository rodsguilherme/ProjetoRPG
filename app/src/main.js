// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRouter from 'vue-router'
import router from './router'
import VueMaterial from 'vue-material'
import './assets/theme.scss'


import App from './App'

Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')  
