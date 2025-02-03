import Joi from 'joi';
import { ResponseToolkit, Request } from '@hapi/hapi';

/**
 * Función reutilizable para manejar errores de validación en Hapi
 */
export const handleValidationError = (request: Request, h: ResponseToolkit, err?: Error) => {
    if (err instanceof Joi.ValidationError) {
        const errorDetails = err.details.map(detail => ({
            field: detail.context?.key,
            message: detail.message
        }));

        return h.response({ errors: errorDetails }).code(400).takeover();
    }

    return h.response({ message: 'Bad Request' }).code(400).takeover();
};
