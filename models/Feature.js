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
        //refrences id from FeatureTag table
        tag_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //refrences id from grill table
        grill_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = Feature;