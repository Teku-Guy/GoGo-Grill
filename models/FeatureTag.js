const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class FeatureTag extends Model {}

FeatureTag.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //feature-tag name
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

module.exports = FeatureTag;