import { AppDataSource } from '../config/database';
import { Item } from '../entities/Item';

export const ItemRepository = AppDataSource.getRepository(Item);