import 'reflect-metadata'; // Importar al inicio
import { startServer } from "./server"

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})

const initServer = async (): Promise<void> => {
    await startServer()
}

initServer();