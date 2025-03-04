<template>
  <div class="reserva-container">
    <h2>Gestión de Reservas</h2>
    <button @click="cargarReservas">Cargar Reservas</button>
    <ul>
      <li v-for="reserva in reservas" :key="reserva.id">
        {{ reserva.nombre }} - {{ reserva.fecha }}
        <button @click="editarReserva(reserva)">Editar</button>
        <button @click="eliminarReserva(reserva.id)">Eliminar</button>
      </li>
    </ul>
    <button @click="crearReserva">Nueva Reserva</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { reservaService } from '@/services/reservaService';

export default {
  name: "ReservaView",
  setup() {
    const reservas = ref([]);
    
    const cargarReservas = async () => {
      reservas.value = await reservaService.getReservas();
    };
    
    const crearReserva = async () => {
      await reservaService.createReserva({ nombre: "Nueva Reserva", fecha: "2025-03-05" });
      cargarReservas();
    };
    
    const editarReserva = async (reserva) => {
      await reservaService.updateReserva(reserva.id, { ...reserva, nombre: "Reserva Editada" });
      cargarReservas();
    };
    
    const eliminarReserva = async (id) => {
      await reservaService.deleteReserva(id);
      cargarReservas();
    };
    
    return { reservas, cargarReservas, crearReserva, editarReserva, eliminarReserva };
  }
};
</script>
