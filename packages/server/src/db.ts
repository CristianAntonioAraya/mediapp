import { Sequelize } from 'sequelize';

import { ProfessionalModel, QuestionModel, UserModel } from './models';

/**
 * Initializes and synchonizes the database using Sequelize
 */
class DatabaseInitializer {
    private sequelize?: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            process.env.POSTGRES_DATABASE!,
            process.env.POSTGRES_USERNAME!,
            process.env.POSTGRES_PASSWORD!,
            {
                host: process.env.POSTGRES_HOST!,
                dialect: 'postgres',
                logging: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
                dialectOptions: {
                    ssl: false,
                },
            }
        );
        this.connectToDataBase();
    }

    private async connectToDataBase(): Promise<void> {
        try {
            await this.sequelize!.authenticate();
            console.log('Connected to the database successfully.');
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
            throw error;
        }
    }

    private async createTables(): Promise<void> {
        try {
            ProfessionalModel.initialize(this.sequelize!);
            QuestionModel.initialize(this.sequelize!);
            UserModel.initialize(this.sequelize!);
            await this.sequelize!.sync();
            console.log('Tables created successfully.');
        } catch (error) {
            console.error('Error synchronizing tables:', error.message);
            throw error;
        }
    }

    public async initializeDatabase(): Promise<void> {
        // await this.createTables();
    }
}

export default DatabaseInitializer;
