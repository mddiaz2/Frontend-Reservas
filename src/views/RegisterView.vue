<template>
  <div class="register-container">
    <h2>Registro</h2>
    <form @submit.prevent="handleRegister">
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="name" required @input="sanitizeInput('name')" />
      
      <label for="email">Correo:</label>
      <input type="email" id="email" v-model="email" required @input="sanitizeInput('email')" />
      
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required @input="checkPassword" />
      <p v-if="passwordError" class="error">La contraseña debe contener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.</p>
      
      <button type="submit">Registrarse</button>
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
  name: "RegisterView",
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const passwordError = ref(false);
    const error = ref('');
    const router = useRouter();

    const sanitizeInput = (field) => {
      if (field === 'name') name.value = validateInput(name.value);
      if (field === 'email') email.value = validateInput(email.value);
    };

    const checkPassword = () => {
      passwordError.value = !validatePassword(password.value);
    };

    const handleRegister = async () => {
      if (passwordError.value) return;
      try {
        await authService.register({ name: name.value, email: email.value, password: password.value });
        router.push('/login');
      } catch (err) {
        error.value = 'Error en el registro';
      }
    };

    return { name, email, password, passwordError, error, sanitizeInput, checkPassword, handleRegister };
  }
};
</script>
