import Vue from 'vue'
import Router from 'vue-router'
import BallWall from '@/components/BallWall'
import Register from '@/components/Register'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'BallWall',
    component: BallWall,
    meta: {requiresAuth: false}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
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
