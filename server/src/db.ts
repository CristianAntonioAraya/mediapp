import { Sequelize } from 'sequelize';

import { ProfessionalModel, QuestionModel, UserModel } from './models';

/**
 * Initializes and synchonizes the database using Sequelize
 */
class DatabaseInitializer {
    private sequelize?: Sequelize;
    private config: {
        username: string;
        password: string;
        host: string;
        database: string;
    };

    constructor() {
        this.config = {
            username: process.env.POSTGRES_USERNAME || '',
            password: process.env.POSTGRES_PASSWORD || '',
            database: process.env.POSTGRES_DATABASE || '',
            host: process.env.POSTGRES_HOST || '',
        };
        this.createSequelizeInstance();
    }

    private async createSequelizeInstance(createdDataBase?: string) {
        this.sequelize = new Sequelize(
            `postgres://${this.config.username}:${this.config.password}@${
                this.config.host
            }:5432/${createdDataBase || ''}`,
            {
                dialect: 'postgres',
                logging: false,
            }
        );
    }

    private async createDatabase(): Promise<void> {
        try {
            await this.sequelize!.query(
                `CREATE DATABASE "${this.config.database}"`
            );
            console.log(
                `Database "${this.config.database}" created successfully.`
            );
        } catch (error) {
            if (
                error.message.includes('ya existe') ||
                error.message.includes('already exists')
            ) {
                console.log(
                    `The database "${this.config.database}" already exists.`
                );
            } else {
                console.error(
                    `Error creating database "${this.config.database}":`,
                    error
                );
                throw new Error(error);
            }
        }
        console.log(`Checking finished, connecting to ${this.config.database}`);

        this.createSequelizeInstance(this.config.database);

        await this.verifyConnection();
    }

    private async verifyConnection(): Promise<void> {
        try {
            await this.sequelize!.authenticate();
            console.log(
                `Connection to ${this.config.database} database established successfully.`
            );
        } catch (error) {
            console.error('Error connecting to database:', error);
        }
    }

    private async createTables(): Promise<void> {
        ProfessionalModel.initialize(this.sequelize!);
        QuestionModel.initialize(this.sequelize!);
        UserModel.initialize(this.sequelize!);

        await this.sequelize!.sync();
        console.log('Tables created successfully.');
    }

    public async closeConnection(): Promise<void> {
        await this.sequelize!.close();
        console.log('Connection closed');
    }

    public async initializeDatabase(): Promise<void> {
        await this.createDatabase();
        await this.createTables();
    }
}

export default DatabaseInitializer;
