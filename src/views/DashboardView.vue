<template>
  <div class="dashboard-container">
    <h2>Bienvenido</h2>
    <p>Email: {{ maskedEmail }}</p>
    <button @click="logout">Cerrar Sesión</button>
    <router-link to="/reserva">Gestionar Reservas</router-link>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router';
import { maskSensitiveData } from '@/utils/security';

export default {
  name: "DashboardView",
  setup() {
    const router = useRouter();
    const email = ref(localStorage.getItem('userEmail') || '');
    const maskedEmail = computed(() => maskSensitiveData(email.value));

    const logout = () => {
      authService.logout();
      router.push('/login');
    };

    return { maskedEmail, logout };
  }
};
</script>