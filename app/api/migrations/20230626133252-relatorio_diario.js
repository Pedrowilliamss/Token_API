'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE VIEW relatorio_diario AS SELECT 
      DATE(temp_criado) AS data,
      count(*) AS "total de senhas emitidas",
        count(CASE WHEN id_status = 3  THEN 1 END) AS "total de senhas atendidas",
        count(CASE WHEN id_prioridade = 1 THEN 1 END) AS "total de senhas preferenciais emitidas",
        count(CASE WHEN id_prioridade = 1 AND id_status = 3 THEN 1 END) AS "total de senhas preferenciais atendidas",
        count(CASE WHEN id_prioridade = 2 THEN 1 END) AS "total de senhas gerais emitidas",
      count(CASE WHEN id_prioridade = 2 AND id_status = 3 THEN 1 END) AS "total de senhas gerais atendidas",
        count(CASE WHEN id_prioridade = 3 THEN 1 END) AS "total de senhas de exames emitidas",
        count(CASE WHEN id_prioridade = 3 AND id_status = 3 THEN 1 END) AS "total de senhas de exames atendidas",
        AVG(timestampdiff(second, temp_criado, temp_atendido)) AS "tempo de espera médio(s)"
        FROM senhas
    WHERE DATE(temp_criado) >= '2023-01-01'
    GROUP BY DATE(temp_criado); 
    `,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW relatorio_diario');
  },
};
