'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status', [{
      nome: 'Em espera',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      nome: 'Em procedimento',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      nome: 'Finalizado',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      nome: 'Cancelado',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', null, {});
  },
};
