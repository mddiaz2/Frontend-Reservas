<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Correo:</label>
      <input type="email" id="email" v-model="email" required @input="sanitizeInput('email')" />
      
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required @input="checkPassword" />
      <p v-if="passwordError" class="error">La contraseña debe contener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.</p>
      
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
    const email = ref('');
    const password = ref('');
    const passwordError = ref(false);
    const error = ref('');
    const router = useRouter();

    const sanitizeInput = (field) => {
      if (field === 'email') email.value = validateInput(email.value);
    };

    const checkPassword = () => {
      passwordError.value = !validatePassword(password.value);
    };

    const handleLogin = async () => {
      if (passwordError.value) return;
      try {
        await authService.login({ email: email.value, password: password.value });
        router.push('/dashboard');
      } catch (err) {
        error.value = 'Credenciales incorrectas';
      }
    };

    return { email, password, passwordError, error, sanitizeInput, checkPassword, handleLogin };
  }
};
</script>
