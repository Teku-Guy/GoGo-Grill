const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const utils = require('../lib/utils')

class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    //return bcrypt.compareSync(loginPw, this.password);
    let userPass = JSON.parse(this.password)
    return utils.validPassword(loginPw, userPass.hash, userPass.salt)
  }
}

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
          address:{
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
          }
    },
    {
      hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await utils.genPassword(newUserData.password);
          return newUserData;
        },
  
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await utils.genPassword(newUserData.password);
          return updatedUserData;
        }
      },
        sequelize,
        timestamps: false,
    }
);

module.exports = User;