import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";

import { routerAuth, routerCategories, routerProducts, routerUser, routerSearch } from "../routes/index.js";


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth           : '/api/auth',
            search         : '/api/search',
            users          : '/api/users',
            categoriers    : '/api/categories',
            products       : '/api/products'
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }


    async conectarDB () {
        await dbConnection();
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
        this.app.use( this.paths.auth, routerAuth);
        this.app.use( this.paths.search, routerSearch);
        this.app.use( this.paths.users, routerUser);
        this.app.use( this.paths.categoriers, routerCategories);
        this.app.use( this.paths.products, routerProducts);
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