import axios from "axios";
import { decodeJWT } from "@/utils/jwtUtils";

const API_URL = "http://localhost:8080/api/auth";

export const authService = {
  async loginStep1(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // "OTP enviado correctamente"
    } catch (error) {
      throw new Error(error.response?.data || "Credenciales incorrectas");
    }
  },

  async verifyOtp(otpPayload) {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, otpPayload);
      const token = response.data.accessToken;


      // Guardar el token y extraer info del usuario
      localStorage.setItem("jwt", token);
      const decoded = decodeJWT(token);
      if (decoded) {
        localStorage.setItem("userRole", decoded.rol);
        localStorage.setItem("userId", decoded.id);
        localStorage.setItem("userEmail", decoded.sub);
      }

      return token;
    } catch (error) {
      throw new Error(error.response?.data || "OTP inválido");
    }
  },

  logout() {
    localStorage.clear();
  },

  isAuthenticated() {
    return !!localStorage.getItem("jwt");
  },
};

