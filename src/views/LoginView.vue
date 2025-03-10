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
          <input type="username" id="username" v-model="username" placeholder="Correo" required @input="sanitizeInput('username')" />
        </div>

        <!-- Campo de contraseña con opción de mostrar/ocultar -->
        <div class="input-group">
          <i class="fa-solid fa-lock"></i>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Contraseña" required @input="checkPassword" />
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
<script>
import { ref } from 'vue';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router';
import { validateInput, validatePassword } from '@/utils/validation';

export default {
  name: "LoginView",
  setup() {
    const username = ref('');
    const password = ref('');
    const passwordError = ref(false);
    const error = ref('');
    const router = useRouter();

    const sanitizeInput = (field) => {
      if (field === 'username') username.value = validateInput(username.value);
    };

    const checkPassword = () => {
      passwordError.value = !validatePassword(password.value);
    };

    const handleLogin = async () => {
      if (passwordError.value) return;
      try {
        await authService.login({ username: username.value, password: password.value });
        router.push('/dashboard');
      } catch (err) {
        error.value = 'Credenciales incorrectas';
      }
    };

    return { username, password, passwordError, error, sanitizeInput, checkPassword, handleLogin };
  }
};
</script>
