'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('guiches', [{
      descricao: 'guiche 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      descricao: 'guiche 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      descricao: 'guiche 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('guiches', null, {});
  },
};
