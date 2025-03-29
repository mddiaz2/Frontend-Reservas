<template>
  <div class="login-box">
    <!-- Icono de usuario arriba -->
    <div class="user-icon">
      <i class="fa-solid fa-user-circle"></i>
    </div>

    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="handleLogin">
      <!-- Campo de correo -->
      <div class="input-group">
        <i class="fa-solid fa-envelope"></i>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Usuario"
          required
          @input="sanitizeInput"
        />
      </div>

      <!-- Campo de contraseña con opción de mostrar/ocultar -->
      <div class="input-group">
        <i class="fa-solid fa-lock"></i>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />
        <i
          class="fa-solid"
          :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
          @click="togglePassword"
        ></i>
      </div>

      <!-- Botón de inicio de sesión -->
      <button type="submit" :disabled="isSubmitting">Ingresar</button>

      <!-- Mensajes de error o éxito -->
      <p v-if="error" class="message error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';           
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();              
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const error = ref('');
    const isSubmitting = ref(false);

    // Función para sanitizar el input de usuario
    const sanitizeInput = () => {
      username.value = username.value.replace(/[^a-zA-Z0-9]/g, '');
    };

    const handleLogin = async () => {
      isSubmitting.value = true;
      try {
        const response = await authService.login({
          username: username.value,
          password: password.value
        });

        const token = response.accessToken;
        if (token) {
          store.dispatch('login', token);

          const userRole = localStorage.getItem("userRole");
          if (userRole === "ADMIN") {
            router.push("/dashboard");
          } else if (userRole === "INQUILINO") {
            router.push("/reserva");
          } else {
            router.push("/");
          }

          error.value = "";
        } else {
          error.value = "Error al procesar el token.";
        }

      } catch (err) {
        console.error("Error en el login:", err);
        error.value = "Credenciales incorrectas";
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      username,
      password,
      error,
      isSubmitting,
      sanitizeInput,  // ✅ Retorna la función para usarla en el template
      handleLogin,
    };
  },
};
</script>

