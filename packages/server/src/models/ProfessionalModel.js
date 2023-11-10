"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Professional extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            professionalName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            speciality: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            range: {
                type: sequelize_1.DataTypes.INTEGER,
                unique: true,
            },
        }, {
            sequelize,
            modelName: 'Professional',
        });
    }
}
exports.default = Professional;
