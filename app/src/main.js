import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import VueRouter from 'vue-router';


import login from './components/login'
import register from './components/register'
import card from './components/card'


const routes = [
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/card', component: card }
]

Vue.use(VueRouter)
Vue.use(vuetify)


const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
