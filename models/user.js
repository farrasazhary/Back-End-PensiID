'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
    handphone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    
  }, {
    hooks: {
      beforeCreate : async(user) => {
        if(user.password) {
          const salt = await bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password, salt)
        }
        if(!user.role_id) {
          const roleUser = await sequelize.models.role.findOne({where: {name: 'user'}})
          user.role_id = roleUser.id
        }
      }
    },
    sequelize,
    modelName: 'user',
  });
  user.prototype.CorrectPassword = async(reqPassword, passwordDB) => {
    return await bcrypt.compareSync(reqPassword, passwordDB)
  }
  return user;
};