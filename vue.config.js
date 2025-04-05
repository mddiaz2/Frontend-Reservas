const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {  // Prefijo para redirigir las peticiones
        target: 'https://54.226.12.49:443',  // URL de tu backend
        changeOrigin: true,  // Necesario para CORS
        secure: false,  // Ignora errores de certificado SSL (solo desarrollo)
        pathRewrite: {
          '^/api': '',  // Elimina el prefijo /api al enviar la petición
        },
      },
    },
  },
});