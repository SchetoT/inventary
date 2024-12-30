
import express from 'express';
import itemRoutes from './routes/itemRoutes.js'; 
/* import userRoutes from './routes/userRoutes.js';   */
import authRoutes from './routes/authRoutes.js'; 
import cors from 'cors';
import connectToDB from './connect.js';
import compression from 'compression';
import zlib from "zlib";

const app = express();
connectToDB();
app.use(
    compression({
      filter: (req, res) => {
        // Solo comprimir respuestas JSON y cuando la ruta empiece con "/api/items" y el método sea GET
        if (req.path.startsWith("/api/items") && req.method === "GET") {
        return res.getHeader("Content-Type")?.includes("application/json");
        }
        return false; // No comprimir otros tipos de respuestas
    },
      level: zlib.constants.Z_BEST_COMPRESSION, // Nivel de compresión
      threshold: 1024, // Umbral en bytes, solo comprimir si el contenido es mayor que este valor
    })
);

app.use(express.json());
app.use(cors());
app.use('/api/items', itemRoutes); 
app.use('/api/auth', authRoutes); 
/* app.use('/api/users', userRoutes); */


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

export default app;