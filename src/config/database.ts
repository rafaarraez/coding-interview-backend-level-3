import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:', // o la ruta que prefieras
    synchronize: true, // Sincroniza el esquema de la base de datos (solo para desarrollo)
    logging: false, // Habilita el logging de las consultas SQL
    entities: [Item], // Registra las entidades
});