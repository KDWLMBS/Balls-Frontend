import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import bwDashboard from '@/components/bwDashboard'
import bwPattern from '@/components/BwPattern'
import bwPatternId from '@/components/BwPatternId'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'bwDashboard',
    component: bwDashboard,
    meta: {requiresAuth: false}
  },
  {
    path: '/pattern',
    name: 'bwPattern',
    component: bwPattern,
    meta: {requiresAuth: true}
  },
  {
    path: '/pattern/:id',
    name: 'bwPatternId',
    component: bwPatternId,
    meta: {requiresAuth: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {requiresAuth: false}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {requiresAuth: false}
  }
]

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (to.meta.requiresAuth) { // check meta
    const dummy = true
    if (dummy) { // store.state.Authenticated // check if is authenticated
      next() // allow next method
    } else {
      next('/') // redirect
    }
  } else {
    next() // allow next if not auth not required
  }
})

export default router
