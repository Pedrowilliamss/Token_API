'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE VIEW senha_view AS SELECT senhas.id, senhas.senha, prioridades.prioridade, \`status\`.nome AS "status" 
      FROM senhas 
      INNER JOIN prioridades ON senhas.id = prioridades.id
      INNER JOIN \`status\` ON senhas.id = \`status\`.id;`,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW senha_view');
  },
};
