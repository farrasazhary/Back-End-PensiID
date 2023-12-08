'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('galleries', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      pencipta: {
        type: Sequelize.STRING
      },
      tanggal_cipta: {
        type: Sequelize.STRING
      },
      gambar_gallery: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('galleries');
  }
};