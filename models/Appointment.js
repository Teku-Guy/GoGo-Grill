const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Appointment extends Model {}

Appointment.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        scheduled_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        //ref id on User's table
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        //refrences the id of wat grill customer will use on the scheduled day
        grill_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
    }
);

module.exports = Appointment;