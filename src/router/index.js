import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailsView from "../views/DetailsView.vue";
import Registration from "../views/Registration.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/adatok",
      name: "Details",
      component: DetailsView,
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
    }
  ],
});

export default router;
