const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Feature extends Model {}

Feature.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feature_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
    }
);