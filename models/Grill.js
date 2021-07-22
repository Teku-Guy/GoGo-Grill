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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        }
    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = Grill;