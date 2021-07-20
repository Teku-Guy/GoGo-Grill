const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model {}

User.init(
    {
        //define Columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          first_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          last_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          age: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          gender:{
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [6]
            }
          },
          grill_id: {
            type: DataTypes.INTEGER,
          }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'user'
    }
);

module.exports = User;