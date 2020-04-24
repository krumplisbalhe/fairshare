import Vue from 'vue'
import Router from 'vue-router'
import Entering from './pages/Entering.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'entering',
      component: Entering
    }
  ]
})
