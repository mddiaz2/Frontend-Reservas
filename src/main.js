import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';


const app = createApp(App);

// Configurar Axios para incluir token CSRF y JWT en solicitudes
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Expiración de sesión por inactividad
let inactivityTimer;
const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        store.dispatch('logout');
        router.push('/login');
    }, 15 * 60 * 1000); // 15 minutos de inactividad
};

window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('keydown', resetInactivityTimer);
resetInactivityTimer();

app.use(router).use(store).mount('#app');
