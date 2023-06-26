'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE VIEW atendimento_view AS SELECT atendimentos.id, \`status\`.nome AS "status", guiches.descricao AS "guiche", senhas.senha, prioridades.prioridade,
     CASE WHEN senhas.temp_atendido IS NULL THEN TIMESTAMPDIFF(MINUTE, senhas.temp_criado, NOW()) ELSE TIMESTAMPDIFF(MINUTE, senhas.temp_criado, senhas.temp_atendido)END AS "tempo de espera",
     CASE WHEN atendimentos.temp_fim IS NULL THEN TIMESTAMPDIFF(MINUTE, atendimentos.temp_inicio, NOW()) ELSE TIMESTAMPDIFF(MINUTE, atendimentos.temp_inicio, temp_fim)END AS "tempo de atendimento"
     FROM atendimentos 
     LEFT JOIN guiches ON guiches.id = atendimentos.id
     LEFT JOIN \`status\` ON \`status\`.id = atendimentos.id
     LEFT JOIN senhas ON senhas.id = atendimentos.id
     LEFT JOIN prioridades ON prioridades.id = senhas.id
     ORDER BY guiches.descricao;`,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW atendimento_view');
  },
};
