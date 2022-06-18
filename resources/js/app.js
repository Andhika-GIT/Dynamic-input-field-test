require("./bootstrap");

import { createApp } from "vue";
import App from "./App.vue";

// import VueToast from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(Toast).mount("#app");
