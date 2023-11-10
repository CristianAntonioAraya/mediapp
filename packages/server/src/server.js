"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const AppRoutes_1 = __importDefault(require("./router/AppRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.dbConnection();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use((0, cors_1.default)());
        this.app.options('*', (0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
    }
    routes() {
        (0, AppRoutes_1.default)(this.app);
        this.handleErrors();
    }
    dbConnection() {
        try {
            const db = new db_1.default();
            db.initializeDatabase();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    handleErrors() {
        //Log errors in console
        this.app.use(ErrorHandler_1.logError);
        this.app.use(ErrorHandler_1.boomErrorHandler);
        this.app.use(ErrorHandler_1.handleError);
    }
    init() {
        this.app.listen(this.port, () => {
            const environment = process.env.NODE_ENV;
            console.log(`Server on port ${this.port} in ${environment} mode`);
        });
    }
}
exports.default = Server;
