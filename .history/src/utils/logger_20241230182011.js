import winston from "winston";

const logger = winston.createLogger({
level: "info",
format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
),
transports: [
    new winston.transports.Console(), // Registro en consola
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Errores en archivo
    new winston.transports.File({ filename: "logs/combined.log" }), // Todo en archivo
  ],
});

export default logger;
