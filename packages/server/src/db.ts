import { Sequelize } from 'sequelize';

import { ProfessionalModel, QuestionModel, UserModel } from './models';

/**
 * Initializes and synchonizes the database using Sequelize
 */
class DatabaseInitializer {
    private sequelize?: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            'postgres://admin:VZJLGoItGiVwvllmLGQWzEkLIs0z2obk@dpg-cl7c6tv6e7vc739rgtr0-a.oregon-postgres.render.com/mediapp_9gao',
            {
                dialect: 'postgres',
                logging: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
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
        await this.createTables();
    }
}

export default DatabaseInitializer;
