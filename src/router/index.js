import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ReservaView from '@/views/ReservaView.vue';
import store from '@/store';
import { sanitizePath } from '@/utils/security';
import HomeView from '@/components/HomeView.vue';

const routes = [
    { path: '/', component: HomeView }, // Ruta principal que carga HomeView
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { 
        path: '/dashboard', 
        component: DashboardView, 
        meta: { requiresAuth: true }
    },
    { 
        path: '/reserva', 
        component: ReservaView, 
        meta: { requiresAuth: true }
    },
    // Ruta comodín para redirigir a HomeView en caso de rutas no existentes
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Protección de rutas y validación de redirecciones
router.beforeEach((to, from, next) => {
    console.log("Destino:", to.path);
    console.log("Destino después de sanitizePath:", sanitizePath(to.path));
    
    if (to.meta.requiresAuth && !store.state.authenticated) {
        next('/login');
    } else {
        const sanitized = sanitizePath(to.path);
        if (sanitized !== to.path) {
            next(sanitized);
        } else {
            next();
        }
    }
});



export default router;
