<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Reservas Comunes</h1>
    <p>Gestione fácilmente la reserva de áreas comunes en su edificio.</p>
    <router-link to="/register" class="button button-primary">Registrarse</router-link>
    <router-link to="/login" class="button button-secondary">Iniciar Sesión</router-link>

  </div>
</template>

<script>
export default {
  name: "HomeView"
};
</script>

<style scoped>
@import '@/assets/styles.css';
</style>