import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "StartPage",
    component:() => import('@/pages/StartPage.vue')
  },
  {
    path: "/selectdifficulty",
    name: "Dificulty",
    component:() => import('@/pages/DifficultPage.vue')
  },
  {
    path: "/crossword",
    name: "Crossword",
    component:() => import('@/pages/CrosswordApp.vue')
  },
  {
    path: "/authadmin",
    name: "Admin",
    component:() => import('@/pages/AdminAuth.vue')
  },
  {
    path: "/getalldata",
    name: "Data",
    component:() => import('@/pages/DataAdmin.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
