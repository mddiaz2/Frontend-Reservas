
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservas';

export const reservaService = {
    getReservas() {
        return axios.get(`${API_URL}`).then(response => response.data);
    },

    createReserva(reservaData) {
        return axios.post(`${API_URL}`, reservaData).then(response => response.data);
    },

    updateReserva(id, reservaData) {
        return axios.put(`${API_URL}/${id}`, reservaData).then(response => response.data);
    },

    deleteReserva(id) {
        return axios.delete(`${API_URL}/${id}`).then(response => response.data);
    }
};
