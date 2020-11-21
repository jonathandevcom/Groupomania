import { createRouter, createWebHashHistory } from 'vue-router'
import Inscription from '../views/Inscription.vue'

const routes = [
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  },
  {
    path: '/connexion',
    name: 'Connexion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Connexion.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
