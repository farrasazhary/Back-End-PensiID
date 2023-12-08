'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kegiatan.init({
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Judul tidak boleh kosong'
        }
      }
    },
    description: DataTypes.TEXT,
    alamat: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    waktu: DataTypes.STRING,

  },
  {
    sequelize,
    modelName: 'kegiatan',
  });
  return kegiatan;
};