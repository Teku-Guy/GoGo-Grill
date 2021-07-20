const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Brand extends Model {}

Brand.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = Brand;