import Vue from 'vue'
import Router from 'vue-router'
import Entering from '@/pages/Entering'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Dashboard from '@/pages/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'entering',
      component: Entering,
      children: [
        {path: 'signin', component: Signin},
        {path: 'signup', component: Signup}
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('user_data')) next({name: 'entering'})
        else next()
      }
    }
  ]
})
