/**
 * Vue Router
 * --------------------
 * The official router for Vue.js.
 *
 * https://next.router.vuejs.org/
 *
 */

import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from '../router'
import { useUserStore } from '../stores/user.store'
import { useNavStore } from '../stores/nav.store'

type InstallRouter = (app: App) => Router
export const installRouter: InstallRouter = (app) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0 }
    },
  })
  router.beforeEach((to, from, next) => {

    if (to.matched.some((record) => record.meta)) {
      const nav = useNavStore()
      nav.setNav(to.meta)
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const user = useUserStore()
      const isAuth = user?.getToken
      if (!isAuth) {
        next({
          path: '/Login',
          query: { redirect: to.fullPath },
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
  app.use(router)
  return router
}
