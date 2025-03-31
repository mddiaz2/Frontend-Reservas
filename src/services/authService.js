import axios from "axios";
import { decodeJWT } from "@/utils/jwtUtils";

const API_URL = "http://localhost:8080/api/auth";

export const authService = {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);

      if (response.status === 200 && response.data.accessToken) {
        const token = response.data.accessToken;
        localStorage.setItem("jwt", token); // Guarda el token en localStorage

        // Decodificar el token para obtener el rol y el usuario
        const decoded = decodeJWT(token);
        if (decoded) {
          localStorage.setItem("userRole", decoded.rol);
          localStorage.setItem("userId", decoded.id);
          localStorage.setItem("userEmail", decoded.sub);
        }

        console.log("Login exitoso, token guardado:", token); // ✅ Log para ver el token
        return response.data; // ✅ Retorna la respuesta correctamente
      } else {
        throw new Error("Token no recibido del backend");
      }
    } catch (error) {
      console.error("Error en el login:", error); // Verificar el objeto de error completo
      throw new Error("Credenciales incorrectas");
    }
  },
  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
  },

  isAuthenticated() {
    return !!localStorage.getItem("jwt");
  },
};
