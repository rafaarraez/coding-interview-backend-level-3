import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';
import * as dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV === 'dev', // Sincroniza el esquema de la base de datos (solo para desarrollo)
    logging: true, // Habilita el logging de las consultas SQL
    entities: [Item], // Registra las entidades
});