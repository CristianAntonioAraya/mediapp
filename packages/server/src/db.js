"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
/**
 * Initializes and synchonizes the database using Sequelize
 */
class DatabaseInitializer {
    constructor() {
        this.config = {
            username: process.env.POSTGRES_USERNAME || '',
            password: process.env.POSTGRES_PASSWORD || '',
            database: process.env.POSTGRES_DATABASE || '',
            host: process.env.POSTGRES_HOST || '',
        };
        this.createSequelizeInstance();
    }
    createSequelizeInstance(createdDataBase) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_1.Sequelize(`postgres://${this.config.username}:${this.config.password}@${this.config.host}:5432/${createdDataBase || ''}`, {
                dialect: 'postgres',
                logging: false,
            });
        });
    }
    createDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.query(`CREATE DATABASE "${this.config.database}"`);
                console.log(`Database "${this.config.database}" created successfully.`);
            }
            catch (error) {
                if (error.message.includes('ya existe') ||
                    error.message.includes('already exists')) {
                    console.log(`The database "${this.config.database}" already exists.`);
                }
                else {
                    console.error(`Error creating database "${this.config.database}":`, error);
                    throw new Error(error);
                }
            }
            console.log(`Checking finished, connecting to ${this.config.database}`);
            this.createSequelizeInstance(this.config.database);
            yield this.verifyConnection();
        });
    }
    verifyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log(`Connection to ${this.config.database} database established successfully.`);
            }
            catch (error) {
                console.error('Error connecting to database:', error);
            }
        });
    }
    createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            models_1.ProfessionalModel.initialize(this.sequelize);
            models_1.QuestionModel.initialize(this.sequelize);
            models_1.UserModel.initialize(this.sequelize);
            yield this.sequelize.sync();
            console.log('Tables created successfully.');
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.close();
            console.log('Connection closed');
        });
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createDatabase();
            yield this.createTables();
        });
    }
}
exports.default = DatabaseInitializer;
