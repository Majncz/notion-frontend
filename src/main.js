import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import axios from 'axios';
import { useGlobalStore } from "@/stores/global.js";

const app = createApp(App)

const pinia = createPinia();
app.use(pinia);

axios.defaults.baseURL = useGlobalStore().apiUrl;
axios.defaults.headers.common['user-id'] = `${useGlobalStore().userId}`;

app.config.globalProperties.mousePosition = { x: 0, y: 0 };

app.use(router)

app.mount('#app')
