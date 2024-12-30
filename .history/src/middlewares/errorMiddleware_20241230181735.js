import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message} - Ruta: ${req.originalUrl} - Método: ${req.method}`);

    res.status(err.statusCode || 500).json({
        message: err.message || 'Error interno del servidor',
    });
};

export default errorHandler;