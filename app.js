import express from 'express';
import router from './routes/itemRoutes.js';

const app = express();

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Asegúrate de que las rutas estén configuradas con el prefijo '/api/items'
app.use('/api/items', router);

export default app;
