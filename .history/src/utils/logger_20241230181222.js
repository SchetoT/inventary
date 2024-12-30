import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Muestra logs en la consola
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Errores en archivo
        new transports.File({ filename: 'logs/combined.log' }), // Todos los logs en archivo
    ],
});

// Exporta el logger para usarlo en otras partes del proyecto
export default logger;