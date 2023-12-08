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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Nama kegiatan sudah ada'
      },
      validate: {
        notNull: {
          msg: 'Judul harus diisi'
        }
      }
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Deskripsi harus diisi'
        }
      }
    },

    pencipta: {
      type: DataTypes.STRING,
    },
    tanggal_cipta: DataTypes.STRING,
    gambar_gallery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gambar harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'gallery',
  });
  return gallery;
};