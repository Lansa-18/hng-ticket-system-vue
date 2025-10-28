import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "DashboardView",
        component: () => import("../views/DashboardView.vue"),
      },
      {
        path: "tickets",
        name: "Tickets",
        component: () => import("../views/TicketsView.vue"),
      },
    ],
  },

  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: Signup,
    meta: { guest: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.checkAuth();

  // Routes that require authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }

  // Guest routes (login, signup)
  else if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  }

  // Public routes
  else {
    next();
  }
});

export default router;
