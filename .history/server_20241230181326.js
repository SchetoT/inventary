import app from './src/app.js';

const PORT = 3000;
app.use((req, res, next) => {
  logger.info(`Solicitud: ${req.method} ${req.url}`);
  next();
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
