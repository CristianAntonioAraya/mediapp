import { Sequelize, Model, DataTypes } from 'sequelize';

class Questions extends Model {
    public id!: number;
    public enunciado!: string;

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                statement: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                alternative1: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                score1: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                alternative2: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                score2: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                alternative3: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                score3: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Questions',
            }
        );
    }
}

export default Questions;
