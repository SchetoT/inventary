import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Configura el nivel de logs que quieres (puede ser: info, warn, error)
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Imprimir en consola
    new winston.transports.File({ filename: 'logs/app.log' }) // Guardar logs en un archivo
  ],
});

export default logger;
