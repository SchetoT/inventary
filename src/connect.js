import mongoose from 'mongoose';
import config from './config/config.js';

export default async function connectToDB() {
    try {
        await mongoose.connect(config.MONGO_DB_URI);
        console.log('Conectado a la base de datos de Mongo');
    } catch (err) {
        console.error('Error al conectar a la base de datos de Mongo', err);
    }
}