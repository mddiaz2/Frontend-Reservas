// src/services/authService.js
import axios from 'axios';
import { decodeJWT } from '@/utils/jwtUtils'; // Importa la función para decodificar el token

const API_URL = 'http://localhost:8080/api/auth';

export const authService = {
  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials).then(response => {
      if (response.data.accessToken) {
        const token = response.data.accessToken;
        localStorage.setItem('jwt', token); // Almacena el token en localStorage

        // Decodifica el token para obtener el rol y el correo electrónico
        const decodedToken = decodeJWT(token);
        if (decodedToken) {
          localStorage.setItem('userRole', decodedToken.rol); // Almacena el rol
          localStorage.setItem('userEmail', decodedToken.sub); // Almacena el correo electrónico
        }
      }
      return response.data;
    });
  },
  


  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  },

  isAuthenticated() {
    return !!localStorage.getItem('jwt');
  }
};