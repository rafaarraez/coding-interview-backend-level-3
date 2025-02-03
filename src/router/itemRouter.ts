import Joi from 'joi';
import { Server } from '@hapi/hapi';
import { ItemHandlers } from '../handlers/ItemHandler';
import { createItemSchema, updateItemSchema } from '../validators/itemValidator';
import { handleValidationError } from '../validators/validationHandler';

export const itemRoutes = (server: Server): void => {
    server.route([
        {
            method: 'GET',
            path: '/ping',
            options: {
                description: 'Hacer ping al servidor',
                notes: 'Retornara un Ok si el servidor esta funcionando',
                tags: ['api', 'items']
            },
            handler: async (request, h) => {
                return {
                    ok: true
                }
            },

        },
        {
            method: 'GET',
            path: '/items',
            options: {
                description: 'Obtener todos los items',
                notes: 'Retorna una lista de items',
                tags: ['api', 'items']
            },
            handler: ItemHandlers.getAllItems

        },
        {
            method: 'GET',
            path: '/items/{id}',
            options: {
                description: 'Obtener un item por ID',
                notes: 'Retorna un item específico',
                tags: ['api', 'items'],
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().required().description('El ID del item'),
                    }),
                },
            },
            handler: ItemHandlers.getItemById

        },
        {
            method: 'POST',
            path: '/items',
            options: {
                description: 'Crear un nuevo item',
                notes: 'Crea un item y lo almacena en la base de datos',
                tags: ['api', 'items'],
                validate: {
                    payload: createItemSchema,
                    failAction: handleValidationError
                }
            },
            handler: ItemHandlers.createItem
        },
        {
            method: 'PUT',
            path: '/items/{id}',
            options: {
                description: 'Actualizar un item',
                notes: 'Actualiza un item existente',
                tags: ['api', 'items'],
                validate: {
                    payload: updateItemSchema,
                    failAction: handleValidationError
                },
            },
            handler: ItemHandlers.updateItem

        },
        {
            method: 'DELETE',
            path: '/items/{id}',
            options: {
                description: 'Eliminar un item',
                notes: 'Elimina un item por su ID',
                tags: ['api', 'items'],
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().required().description('El ID del item a eliminar'),
                    }),
                },
            },
            handler: ItemHandlers.deleteItem

        },
    ]);
};