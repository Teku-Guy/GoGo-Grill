const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Size extends Model{}

Size.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dimensions: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false
    }
);

module.exports = Size;