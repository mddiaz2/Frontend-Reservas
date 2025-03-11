<style scoped>
/* Ajuste del header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #007bff; /* Azul */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Evita que el header se vea afectado por los estilos globales */
.header * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilo del título "Bienvenido" */
.header-title {
  font-size: 18px;
  font-weight: 600;
  flex-grow: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 10px;
}

/* Botón de cerrar sesión */
.logout-btn {
  background-color: #dc3545; /* Rojo */
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
}

/* Evitar que el botón se expanda */
.logout-btn:focus, .logout-btn:active {
  outline: none;
  transform: none;
}

/* Efecto hover */
.logout-btn:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

/* Asegurar responsividad en móviles */
@media (max-width: 600px) {
  .header {
    padding: 0 10px;
  }
  .header-title {
    font-size: 16px;
  }
  .logout-btn {
    padding: 6px 12px;
    font-size: 13px;
    min-width: 100px;
  }
}
</style>