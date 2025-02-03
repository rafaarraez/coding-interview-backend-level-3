import Hapi, { Server } from '@hapi/hapi'
import { itemRoutes } from './router/itemRouter'
import { AppDataSource } from './config/database';
import * as dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env

export const getServer = async (): Promise<Server> => {
    const server = Hapi.server({
        host: 'localhost',
        port: process.env.PORT || 3000,
    })

    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log('Database connected');
        } catch (err) {
            console.error('Error connecting to the database:', err);
            process.exit(1);
        }
    }

    itemRoutes(server)
    return server
}

export const initializeServer = async () => {
    const server = await getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    try {
        // Inicia el servidor
        const server = await getServer()
        await server.start();
        console.log('Server running on %s', server.info.uri);
        return server
    } catch (err) {
        console.error('Error starting the application:', err);
        process.exit(1); // Termina la aplicación si hay un error
    }
};