import { ItemRepository } from '../repositories/itemRepository';
import { Item } from '../entities/Item';

export class ItemService {
    static async getAllItems(): Promise<Item[]> {
        return await ItemRepository.find();
    }

    static async getItemById(id: number): Promise<Item | null> {
        return await ItemRepository.findOneBy({ id });
    }

    static async createItem(name: string, price: number): Promise<Item> {
        const item = new Item();
        item.name = name;
        item.price = price;
        return await ItemRepository.save(item);
    }

    static async updateItem(id: number, name: string, price: number): Promise<Item | null> {
        const item = await ItemRepository.findOneBy({ id });
        if (item) {
            item.name = name;
            item.price = price;
            return await ItemRepository.save(item);
        }
        return null;
    }

    static async deleteItem(id: number): Promise<void> {
        await ItemRepository.delete(id);
    }
}