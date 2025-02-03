import 'reflect-metadata'; // Importar al inicio
import { startServer } from "./server"
import * as dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})

const initServer = async() => {
    await startServer()
}

initServer();