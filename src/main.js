import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import veeValidatePlugin from "@/plugins/VeeValidate";
import toastificationPlugin from "@/plugins/toastification.js";
// Firebase Configurations
import "./plugins/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./plugins/firebase.js";
//CSS Files
import "./assets/tailwind.css";
import "./assets/main.css";

let app;
onAuthStateChanged(auth, (user) => {
  console.log(user?.displayName);
  if (!app) {
    app = createApp(App);
    app.use(store).use(router);
    app.use(veeValidatePlugin);
    app.use(toastificationPlugin);
    app.mount("#app");
  }
});
