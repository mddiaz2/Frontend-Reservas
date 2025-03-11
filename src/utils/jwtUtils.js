export const decodeJWT = (token) => {
    try {
      if (!token) throw new Error("Token no proporcionado");
  
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error("Formato de JWT inválido");
  
      const payload = parts[1]; // El payload está en la segunda parte
      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  
      return decodedPayload;
    } catch (error) {
      console.error('Error al decodificar JWT:', error.message);
      return null;
    }
  };
  