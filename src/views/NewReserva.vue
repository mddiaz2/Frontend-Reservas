<template>
  <div class="reserva-box">
    <h2>Reserva de Áreas Comunes</h2>

    <form @submit.prevent="handleReserva">
      <div class="input-group2">
        <label for="espacio">Área a reservar:</label>
        <select id="espacio" v-model="espacio" required>
          <option value="" disabled>Selecciona un área</option>
          <option value="salon">Salón de Eventos</option>
          <option value="gimnasio">Gimnasio</option>
          <option value="piscina">Piscina</option>
          <option value="bbq">Zona BBQ</option>
          <option value="cancha">Cancha Deportiva</option>
        </select>
      </div>

      <div class="input-group2">
        <label for="fecha">Fecha:</label>
        <input id="fecha" type="date" v-model="fecha" required />
      </div>

      <div class="horario-container">
        <div class="input-group">
          <label for="horaDesde">Hora desde:</label>
          <input id="horaDesde" type="time" v-model="horaDesde" required />
        </div>

        <div class="input-group2">
          <label for="horaHasta">Hora hasta:</label>
          <input id="horaHasta" type="time" v-model="horaHasta" required />
        </div>
      </div>

      <div class="input-group2">
        <label for="comentarios">Comentarios (opcional):</label>
        <textarea id="comentarios" v-model="comentarios" placeholder="Detalles adicionales sobre la reserva"></textarea>
      </div>

      <button type="submit" :disabled="isSubmitting">Confirmar Reserva</button>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    </form>
  </div>
</template>

<script>
import { reservaService } from "@/services/reservaService";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      espacio: "",
      fecha: "",
      horaDesde: "",
      horaHasta: "",
      comentarios: "",
      isSubmitting: false,
    };
  },
  methods: {
    async handleReserva() {
      if (this.horaDesde >= this.horaHasta) {
        Swal.fire({
          icon: 'warning',
          title: 'Horario inválido',
          text: 'La hora de inicio debe ser antes de la hora de finalización.',
        });
        return;
      }

      this.isSubmitting = true;

      try {
        const userId = localStorage.getItem("userId") || 1;
        const stateBookingId = 1;

        const reservaData = {
          reservationDate: this.formatDate(this.fecha),
          reservationTime: this.horaDesde + ":00",
          description: `${this.espacio} - ${this.comentarios || 'Sin comentarios'}`,
          userId: parseInt(userId),
          stateBookingId: stateBookingId,
        };

        await reservaService.createReserva(reservaData);

        Swal.fire({
          icon: 'success',
          title: '¡Reserva confirmada!',
          html: `
            <b>Área:</b> ${this.espacio}<br>
            <b>Fecha:</b> ${this.fecha}<br>
            <b>Horario:</b> ${this.horaDesde} - ${this.horaHasta}
          `,
        });

        // Opcional: limpia el formulario
        this.espacio = '';
        this.fecha = '';
        this.horaDesde = '';
        this.horaHasta = '';
        this.comentarios = '';
      } catch (error) {
        console.error("Error al registrar la reserva:", error);
        Swal.fire({
          icon: 'error',
          title: '¡Oops!',
          text: 'Ocurrió un error al registrar la reserva.',
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    formatDate(dateStr) {
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
