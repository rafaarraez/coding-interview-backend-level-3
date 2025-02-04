import Hapi, { Server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import { itemRoutes } from './router/itemRouter';
import { AppDataSource } from './config/database';
import * as dotenv from 'dotenv';

// Cargar variables de entorno al inicio
dotenv.config();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

/**
 * Inicializa la base de datos si no está conectada.
 */
const initializeDatabase = async () => {
    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log('✅ Database connected');
        } catch (err) {
            console.error('❌ Error connecting to the database:', err);
            throw new Error('Database initialization failed');
        }
    }
};

/**
 * Configura y devuelve una instancia del servidor Hapi.
 */
export const getServer = async (): Promise<Server> => {
    await initializeDatabase();

    const server = Hapi.server({ host: HOST, port: PORT });

    // Configuración de Swagger
    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    };

    // Registrar plugins
    await Promise.all([
        server.register(Inert),
        server.register(Vision),
        server.register({ plugin: HapiSwagger, options: swaggerOptions }),
    ]);

    // Registrar rutas
    itemRoutes(server);

    return server;
};

/**
 * Inicializa el servidor sin arrancarlo (para pruebas).
 */
export const initializeServer = async (): Promise<Server> => {
    const server = await getServer();
    await server.initialize();
    return server;
};

/**
 * Arranca el servidor.
 */
export const startServer = async (): Promise<Server> => {
    try {
        const server = await getServer();
        await server.start();
        console.log(`🚀 Server running at http://${getDisplayHost(server.info.host)}:${server.info.port}`);
        return server;
    } catch (err) {
        console.error('❌ Error starting the application:', err);
        process.exit(1);
    }
};

const getDisplayHost = (host: string): string =>
    host === '0.0.0.0' || host === '::' ? 'localhost' : host;