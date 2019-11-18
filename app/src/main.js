import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import VueRouter from 'vue-router';


import login from './components/login'
import register from './components/register'
import home from './components/home'
import menuComponent from './components/menuComponent'
//import racesComponent from './components/racesComponent'


const routes = [
  { path: '/login', component: login, name: 'login' },
  { path: '/register', component: register, name: 'register' },
  { path: '/', component: home, name: 'home' },
  { path: '/menu', component: menuComponent, name: 'menu' }
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
