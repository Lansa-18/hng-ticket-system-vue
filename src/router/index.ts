import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/auth/login", name: "Login", component: Login },
  { path: "/auth/signup", name: "Signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
