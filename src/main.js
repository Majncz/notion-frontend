import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
app.use(pinia);

app.config.globalProperties.mousePosition = {x: 0, y: 0};

app.use(router)

app.mount('#app')
