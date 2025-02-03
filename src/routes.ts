import { Server } from "@hapi/hapi"

export const defineRoutes = (server: Server) => {
    server.route([{
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    },
    {
        method: 'GET',
        path: '/ping2',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    }])  
}