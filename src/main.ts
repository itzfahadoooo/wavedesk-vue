// src/main.ts
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./style.css"

const app = createApp(App)

app.use(router) // ✅ this is required for <router-view> and <router-link>
app.mount("#app")
