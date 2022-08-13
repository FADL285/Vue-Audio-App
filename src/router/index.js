import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    component: () =>
      import(/* webpackChunkName: "manage" */ "../views/ManageView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (!store.state.users.isUserLoggedIn) {
      store.commit("toggleAuthModal");
      return { name: "home" };
    }
  }
});

export default router;
