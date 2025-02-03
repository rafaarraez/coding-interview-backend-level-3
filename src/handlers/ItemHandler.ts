import { Request, ResponseToolkit } from '@hapi/hapi';
import { ItemService } from '../services/itemService';
import { createItemSchema, updateItemSchema } from '../validators/itemValidator';
import { CreateItemPayload, UpdateItemPayload } from '../types/item';

export class ItemHandlers {
    static async getAllItems(request: Request, h: ResponseToolkit) {
        try {
            const items = await ItemService.getAllItems();
            return h.response(items).code(200);
        } catch (error) {
            console.error('Error in getAllItems:', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async getItemById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const item = await ItemService.getItemById(id);

            if (!item) return h.response({ message: 'Item not found' }).code(404);

            return h.response(item).code(200);
        } catch (error) {
            console.error('Error in getItemById:', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async createItem(request: Request, h: ResponseToolkit) {
        try {
            const { error, value } = createItemSchema.validate(request.payload, { abortEarly: false });
            if (error) {
                const errors = error.details.map(detail => ({
                    field: detail.context?.key,
                    message: detail.message
                }));
                return h.response({ errors }).code(400);
            }
            const { name, price } = value as CreateItemPayload;
            const item = await ItemService.createItem(name, price);
            return h.response(item).code(201);
        } catch (error) {
            console.log('Error trying to createItem: ', error)
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async updateItem(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const { error, value } = updateItemSchema.validate(request.payload, { abortEarly: false });
            if (error) {
                const errors = error.details.map(detail => ({
                    field: detail.context?.key,
                    message: detail.message
                }));
                return h.response({ errors }).code(400);
            }
            const { name, price } = value as UpdateItemPayload;
            const item = await ItemService.updateItem(id, name, price);
            if (item) {
                return h.response(item).code(200);
            }
            return h.response({ message: 'Item not found' }).code(404);
        } catch (error) {
            console.log('Error in updateItem: ', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async deleteItem(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            await ItemService.deleteItem(id);
            return h.response().code(204);
        } catch (error) {
            console.log('Error in deleteItem: ', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }
}