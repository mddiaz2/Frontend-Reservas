<template>
  <div class="login-box">
    <div class="user-icon">
      <i class="fa-solid fa-user-circle"></i>
    </div>

    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <i class="fa-solid fa-envelope"></i>
        <input type="text" id="username" v-model="username" placeholder="Usuario" required
          @input="sanitizeInput('username')" />
      </div>

      <div class="input-group">
        <i class="fa-solid fa-lock"></i>
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Contraseña"
          required @input="checkPassword" />
        <i class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="togglePassword"></i>
      </div>

      <p v-if="passwordError" class="message error">
        La contraseña debe contener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.
      </p>

      <div class="options">
        <label>
          <input type="checkbox" v-model="rememberMe" />
          Recordarme
        </label>
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>

      <button type="submit" :disabled="isSubmitting">Ingresar</button>

      <p v-if="error" class="message error">{{ error }}</p>
      <p v-if="message" class="message success">{{ message }}</p>
    </form>

    <!-- ✅ Modal de OTP -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h3>Verificación OTP</h3>
        <p>Se ha enviado un código a tu correo electrónico.</p>
        <input v-model="otp" class="form-control" placeholder="Código OTP" />
        <button class="btn btn-success" @click="handleVerifyOtp">Verificar</button>
        <button class="btn btn-danger" @click="closeModal">Cancelar</button>
        <p v-if="otpError" class="message error">{{ otpError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { authService } from '@/services/authService';
import { useRouter } from 'vue-router';
import { validateInput, validatePassword } from '@/utils/validation';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const otp = ref('');
    const error = ref('');
    const otpError = ref('');
    const passwordError = ref(false);
    const rememberMe = ref(false);
    const showPassword = ref(false);
    const showModal = ref(false);
    const isAuthenticated = !!localStorage.getItem('jwt');

    const sanitizeInput = (field) => {
      if (field === 'username') {
        username.value = validateInput(username.value);
      }
    };

    const checkPassword = () => {
      passwordError.value = !validatePassword(password.value);
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      if (passwordError.value) return;
      try {
        await authService.loginStep1({
          username: username.value,
          password: password.value,
        });
        showModal.value = true;
        error.value = '';
      } catch (err) {
        error.value = err.message;
      }
    };

    const handleVerifyOtp = async () => {
      try {
        const token = await authService.verifyOtp({
          username: username.value,
          password: password.value,
          otp: otp.value,
        });
        console.log("Token recibido:", token); // ✅ evita el warning

        const role = localStorage.getItem('userRole');
        if (role === 'ADMIN') {
          router.push('/dashboard');
        } else if (role === 'INQUILINO') {
          router.push('/reserva');
        } else {
          router.push('/');
        }
      } catch (err) {
        otpError.value = err.message;
      }
    };

    const closeModal = () => {
      showModal.value = false;
      otp.value = '';
      otpError.value = '';
    };

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
      otp,
      error,
      otpError,
      passwordError,
      rememberMe,
      showPassword,
      showModal,
      sanitizeInput,
      checkPassword,
      togglePassword,
      handleLogin,
      handleVerifyOtp,
      closeModal,
    };
  },
};
</script>


