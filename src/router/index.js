import Vue from 'vue'
import VueRouter from 'vue-router'
import TopMovie from '../views/TopMovie'
import Genres from '../views/Genres'

Vue.use(VueRouter)

const routes = [
  {
    path: '/topMovie',
    name: 'TopMovie',
    component: TopMovie
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genres
  }
]

const router = new VueRouter({
  routes
})

export default router
