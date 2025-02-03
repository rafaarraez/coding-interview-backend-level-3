import { Server } from '@hapi/hapi';
import { ItemHandlers } from '../controllers/itemController';

export const itemRoutes = (server: Server) => {
    server.route([
        {
            method: 'GET',
            path: '/ping',
            handler: async (request, h) => {
                return {
                    ok: true
                }
            }
        },
        {
            method: 'GET',
            path: '/items',
            handler: ItemHandlers.getAllItems,
        },
        {
            method: 'GET',
            path: '/items/{id}',
            handler: ItemHandlers.getItemById,
        },
        {
            method: 'POST',
            path: '/items',
            handler: ItemHandlers.createItem,
        },
        {
            method: 'PUT',
            path: '/items/{id}',
            handler: ItemHandlers.updateItem,
        },
        {
            method: 'DELETE',
            path: '/items/{id}',
            handler: ItemHandlers.deleteItem,
        },
    ]);
};