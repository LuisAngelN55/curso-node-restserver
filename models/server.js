import express from "express";
import cors from "cors";
import { router as routerUsuario } from "../routes/usuarios.js";


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }


    middlewares() {

        // CORS
        this.app.use( cors() )


        // Lectura y Parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use( this.usuariosPath, routerUsuario)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port )
        })
    }
}


export {
    Server
}