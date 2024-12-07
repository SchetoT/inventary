import dotenv from 'dotenv';


dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,          
    JWT_SECRET: process.env.JWT_SECRET,     
    MONGO_DB_URI: process.env.MONGO_DB_URI  
};

console.log("JWT_SECRET:", process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definida en el archivo .env');
}
export const JWT_SECRET = config.JWT_SECRET;
export default config;