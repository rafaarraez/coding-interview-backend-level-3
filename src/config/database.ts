import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/coding_interview',
    synchronize: true,
    logging: true,
    entities: [Item],
    subscribers: [],
    migrations: [],
});