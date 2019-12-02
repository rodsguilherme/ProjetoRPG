import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import routes from './router/index'
Vue.config.productionTip = false

import VueRouter from 'vue-router';


Vue.use(VueRouter)
Vue.use(vuetify)


const router = new VueRouter({
  routes,
  mode: 'history'
})
Vue.prototype.$eventHub = new Vue();

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')