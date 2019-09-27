import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import VueRouter from 'vue-router';

import menu from './components/menu.vue'
import login from './components/login.vue'
import register from './components/register'

const routes = [
  { path: '/menu', component: menu },
  { path: '/login', component: login },
  { path: '/register', component: register }
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
