// src/services/authService.js
import axios from "axios";

const API_URL = "https://54.226.12.49:443/api/inquilinos";

export const registerService = {
  register(userData) {
    return axios.post(`${API_URL}/registrarInquilino`, userData)
      .then((response) => {
        if (response.status === 201) {
          return { success: true }; // 🔹 Retorna un objeto indicando éxito
        }
        throw new Error("Error en el registro");
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        throw error;
      });
  },
};
