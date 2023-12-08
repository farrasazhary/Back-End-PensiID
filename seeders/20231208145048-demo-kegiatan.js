'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kegiatans', 
    [
      {
        id: 1,
        judul: 'Delman Terbang',
        description: 'cek satu dua tiga cek cek cek ada suara ga cek cek satu cek satu',
        alamat: 'Tangerang',
        tanggal: '2023-12-12',
        waktu: '12.00 WIB',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        judul: 'Delman Salto',
        description: 'cek satu dua tiga cek cek cek ada suara ga cek cek satu cek satu',
        alamat: 'Tangerang',
        tanggal: '2023-12-12',
        waktu: '12.00 WIB',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        judul: 'Delman Kayang',
        description: 'cek satu dua tiga cek cek cek ada suara ga cek cek satu cek satu',
        alamat: 'Tangerang',
        tanggal: '2023-12-12',
        waktu: '12.00 WIB',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        judul: 'Delman Tergulibg',
        description: 'cek satu dua tiga cek cek cek ada suara ga cek cek satu cek satu',
        alamat: 'Tangerang',
        tanggal: '2023-12-12',
        waktu: '12.00 WIB',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('kegiatans', null, {});
  }
};
