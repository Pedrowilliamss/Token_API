'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('prioridades', [{
      prioridade: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      prioridade: 'SG',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      prioridade: 'SE',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('prioridades', null, {});
  },
};
