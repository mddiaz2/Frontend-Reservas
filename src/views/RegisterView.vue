<template>
  <div class="register-box">
    <!-- Icono de usuario arriba -->
    <div class="user-icon">
      <i class="fa-solid fa-user-circle"></i>
    </div>

    <h2>Registro</h2>

    <form @submit.prevent="handleRegister">
      <!-- Campo de identificación -->
      <div class="input-group">
        <i class="fa-solid fa-address-card"></i>
        <input type="text" v-model="identification" placeholder="Identificación" required />
      </div>

      <!-- Campo de nombre -->
      <div class="input-group">
        <i class="fa-solid fa-user"></i>
        <input type="text" v-model="name" placeholder="Nombre" required />
      </div>

      <!-- Campo de apellido -->
      <div class="input-group">
        <i class="fa-solid fa-user"></i>
        <input type="text" v-model="last_name" placeholder="Apellido" required />
      </div>

      <!-- Campo de email -->
      <div class="input-group">
        <i class="fa-solid fa-envelope"></i>
        <input type="email" v-model="email" placeholder="Correo Electrónico" required />
      </div>

      <!-- Campo de usuario -->
      <div class="input-group">
        <i class="fa-solid fa-circle-user"></i>
        <input type="text" v-model="username" placeholder="Usuario" required />
      </div>

      <!-- Campo de contraseña con opción de mostrar/ocultar -->
      <div class="input-group">
        <i class="fa-solid fa-lock"></i>
        <input :type="mostrarContrasena ? 'text' : 'password'" v-model="password" placeholder="Contraseña" required />
        <i class="fa-solid" :class="mostrarContrasena ? 'fa-eye' : 'fa-eye-slash'" @click="toggleContrasena"></i>
      </div>

      <!-- Botón de registro -->
      <button type="submit" :disabled="isSubmitting">REGISTRARSE</button>
    </form>

    <!-- Enlace a la pantalla de inicio de sesión -->
    <p class="cambiar-pagina">¿Ya tienes una cuenta? <a href="#">Iniciar sesión</a></p>
  </div>
</template>

<script>
import { ref } from "vue";
import { registerService } from "@/services/registerService";
import { useRouter } from "vue-router";
import Swal from "sweetalert2"; // 🔹 Importar SweetAlert2

export default {
  name: "RegisterView",
  setup() {
    const name = ref("");
    const last_name = ref("");
    const identification = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const isSubmitting = ref(false);
    const router = useRouter();

    const handleRegister = async () => {
      isSubmitting.value = true;

      try {
        const response = await registerService.register({
          name: name.value,
          email: email.value,
          password: password.value,
          last_name: last_name.value,
          username: username.value,
          identification: identification.value,
        });

        if (response.success) {
          // 🔹 SweetAlert2 - Mensaje de éxito
          Swal.fire({
            title: "Registro exitoso",
            text: "Tu usuario ha sido creado correctamente.",
            icon: "success",
            confirmButtonColor: "#007bff",
            confirmButtonText: "Iniciar Sesión",
          }).then(() => {
            router.push("/login");
          });
        }
      } catch (err) {
        console.error(err);

        // 🔹 SweetAlert2 - Mensaje de error
        Swal.fire({
          title: "Error en el registro",
          text: "No se pudo completar el registro. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonColor: "#dc3545",
          confirmButtonText: "Cerrar",
        }).then(() => {
            router.push("/");

        });
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      name,
      email,
      password,
      username,
      last_name,
      identification,
      isSubmitting,
      handleRegister,
    };
  },
};
</script>
