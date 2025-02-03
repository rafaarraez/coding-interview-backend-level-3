import { Request, ResponseToolkit } from '@hapi/hapi';
import { ItemService } from '../services/itemService';
import { createItemSchema, updateItemSchema } from '../validators/itemValidator';
import { Item } from '../entities/Item';
import { CreateItemPayload, UpdateItemPayload } from '../types/item';

export class ItemHandlers {
    static async getAllItems(request: Request, h: ResponseToolkit) {
        try {
            const items: Item[] = await ItemService.getAllItems();
            return h.response(items).code(200);
        } catch (error) {
            console.error('Error in getAllItems:', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async getItemById(request: Request, h: ResponseToolkit) {
        try {
            const id = parseInt(request.params.id, 10);
            const item: Item | null = await ItemService.getItemById(id);

            if (!item) return h.response({ message: 'Item not found' }).code(404);

            return h.response(item).code(200);
        } catch (error) {
            console.error('Error in getItemById:', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async createItem(request: Request, h: ResponseToolkit) {
        try {
            const { name, price } = request.payload as CreateItemPayload;
            const item: Item = await ItemService.createItem(name, price);
            return h.response(item).code(201);
        } catch (error) {
            console.log('Error trying to createItem: ', error)
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }

    static async updateItem(request: Request, h: ResponseToolkit) {
        try {
            const id: number = parseInt(request.params.id, 10);
            const { name, price } = request.payload as UpdateItemPayload;
            const item: Item | null = await ItemService.updateItem(id, name, price);
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
            const id: number = parseInt(request.params.id, 10);
            await ItemService.deleteItem(id);
            return h.response().code(204);
        } catch (error) {
            console.log('Error in deleteItem: ', error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }
}