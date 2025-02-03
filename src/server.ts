import Hapi, { Server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { itemRoutes } from './router/itemRouter';
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

    // Opciones de Swagger
    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: '1.0.0'
        },
        // Puedes agregar más opciones de configuración si lo deseas
    };

    // Registrar plugins
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);


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