import express, { Application } from 'express';
import DatabaseInitializer from './db';
import cors from 'cors';
import path from 'path';

import appRoutes from './router/AppRoutes';
import bodyParser from 'body-parser';
import {
    boomErrorHandler,
    handleError,
    logError,
} from './middlewares/ErrorHandler';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.dbConnection();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use(bodyParser.json());
    }
    routes() {
        this.app.use(express.static(path.join(__dirname, '../client/dist')));

        appRoutes(this.app);

        this.app.get('*', (req, res) => {
            res.sendFile(
                path.join(__dirname, '../../../client/dist', 'index.html')
            );
        });
        this.handleErrors();
    }
    dbConnection() {
        try {
            const db = new DatabaseInitializer();
            db.initializeDatabase();
        } catch (error) {
            throw new Error(error);
        }
    }
    handleErrors() {
        //Log errors in console
        this.app.use(logError);
        this.app.use(boomErrorHandler);
        this.app.use(handleError);
    }
    init() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}

export default Server;
