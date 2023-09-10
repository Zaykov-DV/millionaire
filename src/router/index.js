import { createRouter, createWebHistory } from 'vue-router'
import StartGame from '../views/StartGame.vue'
// import QuizView from '../views/QuizView'
import {useQuestionsStore} from "@/stores/questions-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartGame
    },
    {
      path: '/quiz',
      name: 'quiz',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/QuizView.vue')
    },
    {
      path: '/end',
      name: 'EndGame',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EndGame.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useQuestionsStore()
  // we wanted to use the store here
  if (store.getCategories()) next()
})


export default router
