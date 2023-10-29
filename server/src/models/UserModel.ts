import { Sequelize, Model, DataTypes } from 'sequelize';

class User extends Model {
    public id!: number;
    public userName!: string;
    public email!: string;
    public password!: string;
    public role!: 'admin' | 'patient';
    public phoneNumber!: string;
    public city!: string;
    public genre!: string;
    public birthdate!: string;
    public professionalId!: number | null;
    public professionalName!: string | null;

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                role: {
                    type: DataTypes.ENUM('admin', 'patient'),
                    allowNull: false,
                    defaultValue: 'patient',
                },
                professionalId: {
                    type: DataTypes.INTEGER,
                },
                professionalName: {
                    type: DataTypes.STRING,
                },
                phoneNumber: {
                    type: DataTypes.STRING,
                },
                city: {
                    type: DataTypes.STRING,
                },
                genre: {
                    type: DataTypes.STRING,
                },
                birthdate: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                modelName: 'User',
            }
        );
    }
}

export default User;
