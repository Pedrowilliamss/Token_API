/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const pool = require('../db/dbConfig');

class RelatorioService {
  async buscaRelatorioMensal() {
    const connection = await pool.getConnection();

    const query = 'SELECT * FROM relatorio_mensal';

    try {
      const [resultado] = await connection.query(query);
      const quantidadeResultado = resultado.length;

      console.log(resultado);

      return { quantidadeResultado, resultado };
    } catch (err) {
      console.error(err);
      throw new Error('Erro ao buscar relatórios');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaRelatorioDiario() {
    const connection = await pool.getConnection();

    const query = 'SELECT * FROM relatorio_diario';

    try {
      const [resultado] = await connection.query(query);
      const quantidadeResultado = resultado.length;

      return { quantidadeResultado, resultado };
    } catch (err) {
      console.error(err);
      throw new Error('Erro ao buscar relatórios');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaRelatorioSenha() {
    const connection = await pool.getConnection();

    const query = 'SELECT * FROM relatorio_senha';

    try {
      const [resultado] = await connection.query(query);
      const quantidadeResultado = resultado.length;

      return { quantidadeResultado, resultado };
    } catch (err) {
      console.error(err);
      throw new Error('Erro ao buscar relatórios');
    } finally {
      if (connection) connection.release();
    }
  }
}

module.exports = RelatorioService;
