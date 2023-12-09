'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gallery.init({
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Judul tidak boleh kosong'
        }
      }
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Deskripsi tidak boleh kosong'
        }
      }
    },
    pencipta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal_cipta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gambar_gallery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gambar tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'gallery',
  });
  return gallery;
};