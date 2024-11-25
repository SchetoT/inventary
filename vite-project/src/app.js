import express from 'express';
import router from './routes/itemRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();


app.use(cors());


app.use('/api/items', router);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
