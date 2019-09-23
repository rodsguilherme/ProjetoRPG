import Vue from 'vue'

import { MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Router from 'vue-router'

import login from '../components/login.vue'
import register from '../components/register.vue'
import cards from '../components/cards.vue'


Vue.use(MdButton)
Vue.use(MdField)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }, 
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/cards',
      name: 'cards',
      component: cards
    }

  ]
})
