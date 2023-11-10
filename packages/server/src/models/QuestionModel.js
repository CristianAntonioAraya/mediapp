"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Questions extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            statement: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            alternative1: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            score1: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            alternative2: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            score2: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            alternative3: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            score3: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Questions',
        });
    }
}
exports.default = Questions;
