import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.mousePosition = {x: 0, y: 0};

app.use(router)

app.mount('#app')
