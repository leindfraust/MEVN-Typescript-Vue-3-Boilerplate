import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bulma'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(VueAxios, axios).use(pinia).mount('#app')
