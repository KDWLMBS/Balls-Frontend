import Vue from 'vue'
import Router from 'vue-router'
import bwAuth from '../components/bwAuth'
import bwLogout from '../components/bwLogout'
import bwDashboard from '../components/bwDashboard'
import bwPattern from '../components/bwPattern'
import bwPatternId from '../components/bwPatternId'
import bwFormula from '../components/bwFormula'
import bwFormulaId from '../components/bwFormulaId'
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
    path: '/formula',
    name: 'bwFormula',
    component: bwFormula,
    meta: {requiresAuth: true}
  },
  {
    path: '/formula/:id',
    name: 'bwFormulaId',
    component: bwFormulaId,
    meta: {requiresAuth: true}
  },
  {
    path: '/auth',
    name: 'bwAuth',
    component: bwAuth,
    meta: {requiresAuth: false}
  },
  {
    path: '/logout',
    name: 'bwLogout',
    component: bwLogout,
    meta: {requiresAuth: false}
  }
]

const router = new Router({routes})

router.beforeEach(async (to, from, next) => {
  console.log(to, from, next)

  let success = true
  if (!store.getters.isLoggedIn) {
    await store.dispatch('me').catch(() => {
      success = false
    })
  }

  if (to.meta.requiresAuth) { // check meta
    if (store.getters.isLoggedIn && success) {
      next()
    } else {
      next('/auth')
    }
  } else {
    next() // allow next if not auth not required
  }
})

export default router
