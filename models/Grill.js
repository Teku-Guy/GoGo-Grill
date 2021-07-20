const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Grill extends Model {}

Grill.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        feature: DataTypes.INTEGER,
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = Grill;