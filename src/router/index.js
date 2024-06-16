import { createRouter, createWebHistory } from "vue-router";
import Selymek from "../views/Selymek.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AdminPage from "../views/AdminPage.vue";
import Kapcsolat from "../views/Kapcsolat.vue";
import Rolam from "../views/Rolam.vue";
import Ujdonsagok from "../views/Ujdonsagok.vue";
import Vasarlas from "../views/Vasarlas.vue";
import Kendok from "../Selymek_kategoriak/Kendok.vue";
import Salak from "../Selymek_kategoriak/Salak.vue";
import Register from "../views/Register.vue";
import SalScroller from "../Selymek_kategoriak/SalakScroller.vue";
import KendoScroller from "../Selymek_kategoriak/KendokScroller.vue";

const routes = [

  {path: '/', name: 'Home', component: Home},
  {path: '/selymek', name: 'Selymek', component: Selymek},
  {path: '/admin', name: 'AdminPage', component: AdminPage},
  {path: '/login', name: 'Login', component: Login},
  {path: '/kapcsolat', name: 'Kapcsolat', component: Kapcsolat},
  {path: '/rolam', name: 'Rolam', component: Rolam},
  {path: '/ujdonsagok', name: 'Ujdonsagok', component: Ujdonsagok},
  {path: '/vasarlas', name: 'Vasarlas', component: Vasarlas},
  {path: '/kendok', name: 'Kendok', component: Kendok},
  {path: '/salak', name: 'Salak', component: Salak},
  {path: '/register', name: 'Register', component: Register},
  {path: '/sal-scroller', name: 'SalakScroller', component: SalScroller},
  {path: '/kendo-scroller', name: 'KendokScroller', component: KendoScroller},
];

const baseURL = import.meta.env.VUE_APP_BASE_URL || '/';
const router = createRouter({
  history: createWebHistory(baseURL),
  routes,
});

export default router;
