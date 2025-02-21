import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Design System
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(VueAxios, axios)
app.axios.defaults.baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
app.provide('axios', app.config.globalProperties.axios)
app.directive('tooltip', Tooltip)
app.use(ToastService)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
