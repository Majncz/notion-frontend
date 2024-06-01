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
axios.interceptors.response.use(
    response => {
        // Normal response processing
        return response;
    },
    error => {
        // Check for a 401 status and specific message
        if (error.response && error.response.status === 401 && error.response.data === "User not found") {
            // Redirect to /signin
            window.location.href = '/signin';
        }
        // Log the error and reject the promise to propagate the error
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
    }
);

app.config.globalProperties.mousePosition = { x: 0, y: 0 };

app.use(router)

app.mount('#app')
