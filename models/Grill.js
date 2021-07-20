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
        grill_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize
    }
);

module.exports = Grill;