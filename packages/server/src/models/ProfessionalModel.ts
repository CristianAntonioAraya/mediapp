import { Sequelize, Model, DataTypes } from 'sequelize';

class Professional extends Model {
    public id!: number;
    public professionalName!: string;
    public speciality!: string;

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                professionalName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                speciality: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                range: {
                    type: DataTypes.INTEGER,
                    unique: true,
                },
            },
            {
                sequelize,
                modelName: 'Professional',
            }
        );
    }
}

export default Professional;
