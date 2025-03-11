<template>
    <header class="header">
      <h1 class="header-title">Bienvenido, {{ email }}</h1>
      <button @click="logout" class="logout-btn">
        Cerrar Sesión
      </button>
    </header>
  </template>
  
  <script>

import { ref } from 'vue';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router';
  
  export default {
    name: "AppHeader",
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
  
  <style scoped>

  </style>
  