import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueNotes from '@/components/VueNotes'
import test from '@/components/Test'
import Auth from '@okta/okta-vue'
// import { Test } from 'mocha'

Vue.use(Auth, {
  issuer: 'https://dev-273341.okta.com/oauth2/default',
  client_id: '0oamzx1sloX9fAOX74x6',
  redirect_uri: 'http://localhost:8080/callback'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Test',
      component: test
    },
    {
      path: '/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/notes',
      name: 'VueNotes',
      component: VueNotes,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRequiredGuard())

export default router
