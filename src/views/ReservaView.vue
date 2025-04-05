<template>
  <div class="reserva-container">
    <h2>Gestión de Reservas</h2>
    
    <div class="header-actions">
      <router-link to="/newreserva" class="btn-create">
        <i class="fas fa-plus"></i> Crear Nueva Reserva
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="reservas-grid">
        <thead>
          <tr>
            <th>Inquilino</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reserva in reservas" :key="reserva.id">
         
            <td>{{ reserva.name }} {{ reserva.lastName || '' }}</td>
            <td>{{ reserva.reservationDate }}</td>
            <td>{{ reserva.reservationTime }}</td>
            <td>{{ reserva.description }}</td>
      
            <td class="action-buttons">
              <button @click="editarReserva(reserva)" class="btn-edit">
                <i class="fas fa-edit"></i> Editar
              </button>
              <!-- <button @click="confirmarEliminar(reserva.id)" class="btn-delete">
                <i class="fas fa-trash-alt"></i> Eliminar
              </button> -->
            </td>
          </tr>
          <tr v-if="reservas.length === 0">
            <td colspan="4" class="no-reservas">
              <i class="fas fa-info-circle"></i> No hay reservas registradas
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { reservaService } from '@/services/reservaService';

export default {
  name: "ReservaView",
  setup() {
    const reservas = ref([]);
    const showDeleteModal = ref(false);
    const reservaToDelete = ref(null);
    const isLoading = ref(true);

    // Cargar reservas al montar el componente
    onMounted(async () => {
      await cargarReservas();
      isLoading.value = false;
    });

    const cargarReservas = async () => {
      try {
        reservas.value = await reservaService.getReservas();
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    };

    const formatFecha = (fecha) => {
      if (!fecha) return '';
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
      });
    };

    const editarReserva = (reserva) => {
      // Aquí podrías navegar a una vista de edición o abrir un modal
      console.log("Editar reserva:", reserva);
    };

    const confirmarEliminar = (id) => {
      reservaToDelete.value = id;
      showDeleteModal.value = true;
    };

    const cancelarEliminar = () => {
      showDeleteModal.value = false;
      reservaToDelete.value = null;
    };

    const eliminarReservaConfirmado = async () => {
      if (reservaToDelete.value) {
        try {
          await reservaService.deleteReserva(reservaToDelete.value);
          await cargarReservas();
        } catch (error) {
          console.error("Error al eliminar reserva:", error);
        } finally {
          showDeleteModal.value = false;
          reservaToDelete.value = null;
        }
      }
    };

    return { 
      reservas, 
      showDeleteModal,
      formatFecha,
      editarReserva, 
      confirmarEliminar,
      cancelarEliminar,
      eliminarReservaConfirmado,
      isLoading
    };
  }
};
</script>

