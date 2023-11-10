"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: sequelize_1.DataTypes.ENUM('admin', 'patient'),
                allowNull: false,
                defaultValue: 'patient',
            },
            registerScore: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            professionalId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            professionalName: {
                type: sequelize_1.DataTypes.STRING,
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            city: {
                type: sequelize_1.DataTypes.STRING,
            },
            genre: {
                type: sequelize_1.DataTypes.STRING,
            },
            age: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            sequelize,
            modelName: 'User',
        });
    }
}
exports.default = User;
