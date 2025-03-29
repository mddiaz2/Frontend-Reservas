// src/services/reservaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservas';

export const reservaService = {
  getReservas() {
    const token = localStorage.getItem("jwt");  // Corregido: usar la clave correcta
    return axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
      },
    }).then(response => response.data);
  },

  createReserva(reservaData) {
    const token = localStorage.getItem("jwt");  // Corregido: usar la clave correcta
    return axios.post(`${API_URL}/registrarReserva`, reservaData, {
      headers: {
        Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
      },
    }).then(response => response.data);
  },

  updateReserva(id, reservaData) {
    const token = localStorage.getItem("jwt");  // Corregido: usar la clave correcta
    return axios.put(`${API_URL}/${id}`, reservaData, {
      headers: {
        Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
      },
    }).then(response => response.data);
  },

  deleteReserva(id) {
    const token = localStorage.getItem("jwt");  // Corregido: usar la clave correcta
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
      },
    }).then(response => response.data);
  }
};
