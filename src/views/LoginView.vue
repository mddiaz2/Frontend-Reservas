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
        <input type="username" id="username" v-model="username" placeholder="Usuario" required
          @input="sanitizeInput('username')" />
      </div>

      <!-- Campo de contraseña con opción de mostrar/ocultar -->
      <div class="input-group">
        <i class="fa-solid fa-lock"></i>
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Contraseña"
          required @input="checkPassword" />
        <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
      </div>

      <!-- Mensaje de validación de contraseña -->
      <p v-if="passwordError" class="message error">
        La contraseña debe contener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.
      </p>

      <!-- Opciones adicionales -->
      <div class="options">
        <label>
          <input type="checkbox" v-model="rememberMe" />
          Recordarme
        </label>
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>

      <!-- Botón de inicio de sesión -->
      <button type="submit" :disabled="isSubmitting">Ingresar</button>

      <!-- Mensajes de error o éxito -->
      <p v-if="error" class="message error">{{ error }}</p>
      <p v-if="message" class="message success">{{ message }}</p>
    </form>
  </div>

</template>

// src/views/LoginView.vue
<script>
import { ref, onMounted } from 'vue';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router';
import { validateInput, validatePassword } from '@/utils/validation'; // Importa las funciones de validación

export default {
  name: "LoginView",
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const passwordError = ref(false);
    const error = ref('');
    const isAuthenticated = !!localStorage.getItem('jwt');

    // Función para sanitizar el input
    const sanitizeInput = (field) => {
      if (field === 'username') {
        username.value = validateInput(username.value); // Usa validateInput para sanitizar
      }
    };

    // Función para validar la contraseña
    const checkPassword = () => {
      passwordError.value = !validatePassword(password.value);
    };

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
      if (passwordError.value) return;
      try {
        await authService.login({ username: username.value, password: password.value });
        router.push('/dashboard');
      } catch (err) {
        error.value = 'Credenciales incorrectas';
      }
    };

    // Si el usuario ya está autenticado, redirige a la ruta correspondiente
    onMounted(() => {
      if (isAuthenticated) {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'ADMIN') {
          router.push('/dashboard');
        } else if (userRole === 'INQUILINO') {
          router.push('/reserva');
        }
      }
    });

    return {
      username,
      password,
      passwordError,
      error,
      sanitizeInput, // Retorna la función
      checkPassword,
      handleLogin,
    };
  }
};
</script>