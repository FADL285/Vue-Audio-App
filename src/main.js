import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import veeValidatePlugin from "@/plugins/VeeValidate";
import "./assets/tailwind.css";
import "./assets/main.css";

const app = createApp(App);
app.use(store).use(router);
app.use(veeValidatePlugin);
app.mount("#app");
