import { Server } from '@hapi/hapi';
import { ItemHandlers } from '../handlers/ItemHandler';
import Joi from 'joi';

export const itemRoutes = (server: Server): void => {
    server.route([
        {
            method: 'GET',
            path: '/ping',
            handler: async (request, h) => {
                return {
                    ok: true
                }
            },
            options: {
                description: 'Hacer ping al servidor',
                notes: 'Retornara un Ok si el servidor esta funcionando',
                tags: ['api', 'items']
            }
        },
        {
            method: 'GET',
            path: '/items',
            handler: ItemHandlers.getAllItems,
            options: {
                description: 'Obtener todos los items',
                notes: 'Retorna una lista de items',
                tags: ['api', 'items']
            }
        },
        {
            method: 'GET',
            path: '/items/{id}',
            handler: ItemHandlers.getItemById,
            options: {
                description: 'Obtener un item por ID',
                notes: 'Retorna un item específico',
                tags: ['api', 'items'],
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().required().description('El ID del item'),
                    }),
                },
            }
        },
        {
            method: 'POST',
            path: '/items',
            handler: ItemHandlers.createItem,
            options: {
                description: 'Crear un nuevo item',
                notes: 'Crea un item y lo almacena en la base de datos',
                tags: ['api', 'items'],
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).max(100).required().description('Nombre del item'),
                        price: Joi.number().min(0).required().description('Precio del item'),
                    }),
                },
            }
        },
        {
            method: 'PUT',
            path: '/items/{id}',
            handler: ItemHandlers.updateItem,
            options: {
                description: 'Actualizar un item',
                notes: 'Actualiza un item existente',
                tags: ['api', 'items'],
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().required().description('El ID del item'),
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(3).max(100).required().description('Nuevo nombre del item'),
                        price: Joi.number().min(0).required().description('Nuevo precio del item'),
                    }),
                },
            }
        },
        {
            method: 'DELETE',
            path: '/items/{id}',
            handler: ItemHandlers.deleteItem,
            options: {
                description: 'Eliminar un item',
                notes: 'Elimina un item por su ID',
                tags: ['api', 'items'],
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().required().description('El ID del item a eliminar'),
                    }),
                },
            }
        },
    ]);
};