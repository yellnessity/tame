import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Messages from '../views/Messages.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/animal',
    name: 'animal',
    component: () => import('../views/Animal.vue'),
    props: (route) => ({ animalId: route.query.id || "" }),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
