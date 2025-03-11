<template>
  
      <div class="reserva-box">
        <h2>Reserva de Áreas Comunes</h2>
  
        <form @submit.prevent="handleReserva">
          <!-- Selección de área -->
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
  
          <!-- Selección de fecha -->
          <div class="input-group2">
            <label for="fecha">Fecha:</label>
            <input id="fecha" type="date" v-model="fecha" required />
          </div>
  
          <!-- Selección de horario -->
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
  
          <!-- Comentarios opcionales -->
          <div class="input-group2">
            <label for="comentarios">Comentarios (opcional):</label>
            <textarea id="comentarios" v-model="comentarios" placeholder="Detalles adicionales sobre la reserva"></textarea>
          </div>
  
          <!-- Botón de reserva -->
          <button type="submit" :disabled="isSubmitting">Confirmar Reserva</button>
  
          <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
        </form>
      </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        espacio: '',
        fecha: '',
        horaDesde: '',
        horaHasta: '',
        comentarios: '',
        mensaje: '',
        isSubmitting: false,
      };
    },
    methods: {
      handleReserva() {
        if (this.horaDesde >= this.horaHasta) {
          this.mensaje = "La hora de inicio debe ser antes de la hora de finalización.";
          return;
        }
  
        this.isSubmitting = true;
  
        // Simulación de confirmación de reserva
        setTimeout(() => {
          this.isSubmitting = false;
          this.mensaje = `✅ ¡Reserva confirmada! 
          Área: ${this.espacio}, 
          Fecha: ${this.fecha}, 
          Horario: ${this.horaDesde} - ${this.horaHasta}`;
        }, 1000);
      },
    },
  };
  </script>
  