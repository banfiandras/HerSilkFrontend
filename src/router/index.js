import { createRouter, createWebHistory } from "vue-router";
import Details from "../views/Details.vue";
import Home from "../views/Home.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminPage from "../views/AdminPage.vue";


const routes = [

  {path: '/', name: 'Home', component: Home},
  {path: '/details', name: 'Details', component: Details},
  {path: '/admin', name: 'AdminPage', component: AdminPage},
  {path: '/adminlogin', name: 'AdminLogin', component: AdminLogin},
];

const baseURL = import.meta.env.VUE_APP_BASE_URL || '/';
const router = createRouter({
  history: createWebHistory(baseURL),
  routes,
});

export default router;
