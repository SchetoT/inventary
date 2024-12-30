
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
//compresion de archivos
app.use(
    compression({
        filter: (req, res) =>({
            filter: (req, res) => {
                return res.getHeader("Content-Type").includes("application/json");
                if (req.path.startsWith("/api/items") && req.method === "GET") {
                    return compression.filter(req, res);
                }
            },
            level: zlib.constants.Z_BEST_COMPRESSION,
            theresold: 1024,
        }),
,

app.use(express.json());
app.use(cors());
app.use('/api/items', itemRoutes); 
app.use('/api/auth', authRoutes); 
/* app.use('/api/users', userRoutes); */


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

export default app;