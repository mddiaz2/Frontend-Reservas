// src/views/DashboardView.vue
<template>
  <div class="dashboard-container">
    <h2>Bienvenido</h2>
    <p>Email: {{ email }}</p>
    <button @click="logout">Cerrar Sesión</button>
    <router-link to="/reserva">Gestionar Reservas</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router';

export default {
  name: "DashboardView",
  setup() {
    const router = useRouter();
    const email = ref(localStorage.getItem('userEmail') || '');

    const logout = () => {
      authService.logout();
      router.push('/login');
    };

    return { email, logout };
  }
};
</script>