// src/views/DashboardView.vue
<template>
  <div class="dashboard-container">


    <router-link to="/reserva" class="btn btn-success">Gestionar Reservas</router-link>
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
      router.push('/');
    };

    return { email, logout };
  }
};
</script>