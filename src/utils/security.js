export const sanitizePath = (path) => {
    const safePath = path.replace(/[^a-zA-Z0-9-_]/g, ''); // Eliminación de caracteres no permitidos
    return safePath.startsWith('/') ? safePath : '/' + safePath;
};
