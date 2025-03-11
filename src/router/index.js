// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import ReservaView from "@/views/ReservaView.vue";
import HomeView from "@/components/HomeView.vue";
import NewReserva from "@/views/NewReserva.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView }, // No requiere autenticación
  { path: "/register", component: RegisterView }, // No requiere autenticación
  
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true, requiredRole: 'ADMIN' }, // Solo accesible para ADMIN
  },
  {
    path: "/reserva",
    component: ReservaView,
    meta: { requiresAuth: true, requiredRole: 'INQUILINO' }, // Solo accesible para INQUILINO
  },
  {
    path: "/newreserva",
    component: NewReserva,
    meta: { requiresAuth: true, requiredRole: 'INQUILINO' }, // Solo accesible para INQUILINO
  },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // Ruta comodín para redirigir a HomeView
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt'); // Verifica si el usuario está autenticado
  const userRole = localStorage.getItem('userRole'); // Obtiene el rol del usuario

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
    next('/login');
  } else if (to.meta.requiresAuth && to.meta.requiredRole && to.meta.requiredRole !== userRole) {
    // Si la ruta requiere un rol específico y el usuario no lo tiene, redirige a una ruta por defecto
    if (userRole === 'ADMIN') {
      next('/dashboard'); // Redirige a Dashboard si es ADMIN
    } else if (userRole === 'INQUILINO') {
      next('/reserva'); // Redirige a Reserva si es INQUILINO
    } else {
      next('/'); // Redirige a Home si no tiene un rol válido
    }
  } else {
    // Si todo está bien, permite el acceso
    next();
  }
});

export default router;