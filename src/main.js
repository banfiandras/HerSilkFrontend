import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from './store';

import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './assets/css/style.css';

const app = createApp(App);
const pinia = createPinia();
const authStore = useAuthStore(pinia);

authStore.initializeAuthState();

app.use(pinia);
app.use(router);

app.mount("#app");
