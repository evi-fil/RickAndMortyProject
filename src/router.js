import { createRouter, createWebHistory } from "vue-router"
import AllCharacters from "./components/AllCharacters.vue"
import ViewCharacter from "./components/ViewCharacter.vue"

const routes = [
  { path: '/', component: AllCharacters },
  { path: '/character/:id', component: ViewCharacter },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router