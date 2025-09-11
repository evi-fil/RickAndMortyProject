import { createRouter, createWebHistory } from "vue-router";
import AllCharacters from "./components/AllCharacters.vue";
import ViewCharacter from "./components/ViewCharacter.vue";
import Welcome from "./components/Welcome.vue";
import SearchCharacter from "./components/SearchCharacter.vue";

const routes = [
  { path: '/', component: Welcome },
  { path: '/all-characters', component: AllCharacters },
  { path: '/character/:id', component: ViewCharacter }, 
  { path: '/character', component: SearchCharacter }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
