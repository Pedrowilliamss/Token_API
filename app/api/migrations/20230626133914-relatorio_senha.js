'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE VIEW relatorio_senha AS SELECT 
        senhas.id,
        senhas.senha,
        prioridades.prioridade,
        \`status\`.nome AS "status",
        senhas.temp_criado AS "data/hora de criação",
        senhas.temp_atendido AS "data/hora de atendimento",
        guiches.descricao AS "guiche",
        AVG(timestampdiff(second, senhas.temp_criado, senhas.temp_atendido)) AS "tempo de espera médio(s)",
      AVG(timestampdiff(second, atendimentos.temp_inicio, atendimentos.temp_fim)) AS "tempo de atendimento médio(s)"
        FROM senhas
    INNER JOIN prioridades ON senhas.id = prioridades.id
    INNER JOIN \`status\` ON senhas.id = \`status\`.id
    LEFT JOIN atendimentos ON atendimentos.id = senhas.id
    LEFT JOIN guiches ON atendimentos.id = guiches.id
    GROUP BY senhas.id, senhas.senha, prioridades.prioridade, \`status\`.nome, guiches.descricao;`,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW relatorio_senha');
  },
};
