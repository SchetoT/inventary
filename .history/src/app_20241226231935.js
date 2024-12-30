
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

app.use(express.json());
app.use(cors());
app.use('/api/items', itemRoutes); 
app.use('/api/auth', authRoutes); 
/* app.use('/api/users', userRoutes); */


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

export default app;