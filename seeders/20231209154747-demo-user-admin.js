'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSaltSync(10)
    const adminId = await queryInterface.rawSelect('roles', {
      where: {name: 'admin'}
    }, ['id'])
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@gmail.com',
      handphone: '08228181',
      alamat: '-',
      password: bcrypt.hashSync('12345678', salt),
      role_id: adminId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
