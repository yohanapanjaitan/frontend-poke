import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import store from '../store'

Vue.use(Router)

const checkUserLogin = (to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn
  if (isLoggedIn) {
    next()
  } else {
    router.push({ name: 'Login' })
  }
}

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../components/Register.vue')
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: () => import(/* webpackChunkName: "login" */ '../components/Pokemon.vue'),
    beforeEnter (to, from, next) {
      checkUserLogin(to, from, next)
    }
  }
]

const router = new (Router)({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('user')

//   if (to.matched.some(record => record.meta.auth) && !loggedIn) {
//     next('/login')
//     return
//   }
//   next()
// })
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next({ name: 'Pokemon' })
    }
  } else {
    next()
  }
})
export default router
