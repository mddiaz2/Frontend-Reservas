import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ReservaView from '@/views/ReservaView.vue';
import store from '@/store';
import { sanitizePath } from '@/utils/security';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/loginview', component: LoginView },
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Protección de rutas y validación de redirecciones
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.authenticated) {
        next('/login');
    } else {
        next(sanitizePath(to.path));
    }
});

export default router;
