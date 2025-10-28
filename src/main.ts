import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "./styles/global.css";
import "./styles/tailwind.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
});
app.mount("#app");
