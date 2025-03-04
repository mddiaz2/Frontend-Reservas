// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const authService = {
    login(credentials) {
        return axios.post(`${API_URL}/login`, credentials).then(response => {
            if (response.data.token) {
                localStorage.setItem('jwt', response.data.token);
            }
            return response.data;
        });
    },

    register(userData) {
        return axios.post(`${API_URL}/register`, userData).then(response => response.data);
    },

    logout() {
        localStorage.removeItem('jwt');
    },

    isAuthenticated() {
        return !!localStorage.getItem('jwt');
    }
};
