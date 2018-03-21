import Vue from 'vue'
import Router from 'vue-router'
import bwRegister from '../components/bwRegister'
import bwLogin from '../components/bwLogin'
import bwDashboard from '../components/bwDashboard'
import bwPattern from '../components/bwPattern'
import bwPatternId from '../components/bwPatternId'
import store from '../store/index'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'bwDashboard',
    component: bwDashboard,
    meta: {requiresAuth: true}
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
    name: 'bwRegister',
    component: bwRegister,
    meta: {requiresAuth: false}
  },
  {
    path: '/login',
    name: 'bwLogin',
    component: bwLogin,
    meta: {requiresAuth: false}
  }
]

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (to.meta.requiresAuth) { // check meta
    if (store.getters.isLoggedIn) { // store.state.Authenticated // check if is authenticated
      next() // allow next method
    } else {
      next('/login') // redirect
    }
  } else {
    next() // allow next if not auth not required
  }
})

export default router
