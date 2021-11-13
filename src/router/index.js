import Vue from 'vue'
import VueRouter from 'vue-router'
import TopMovie from '../views/TopMovie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/topMovie',
    name: 'TopMovie',
    component: TopMovie
  }
]

const router = new VueRouter({
  routes
})

export default router
