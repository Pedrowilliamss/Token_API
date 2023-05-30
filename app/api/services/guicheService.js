/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const pool = require('../db/dbConfig');

class GuicheService {
  async buscaGuiche() {
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM guiche';
    try {
      const [resultado] = await connection.query(query);
      const quantidadeResultado = resultado.length;

      return { resultado, quantidadeResultado };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao buscar guiche');
    } finally {
      if (connection) connection.release();
    }
  }

  async criaGuiche(dto) {
    const connection = await pool.getConnection();
    const query = `INSERT INTO guiche VALUES (default, "${dto.descricao}")`;

    try {
      await connection.query(query);

      return { mensagem: 'Guiche Criado com sucesso' };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao criar guiche');
    } finally {
      if (connection) connection.release();
    }
  }

  async atualizaGuiche(dto) {
    const connection = await pool.getConnection();
    const query = `UPDATE guiche SET descricao = "${dto.descricao}" WHERE id_guiche = ${dto.idGuiche}`;

    try {
      await connection.query(query);

      return { mensagem: 'Guiche Criado com sucesso' };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao atualizar guiche');
    } finally {
      if (connection) connection.release();
    }
  }

  async cancelaGuiche(dto) {
    const query = `DELETE FROM guiche WHERE id_guiche = ${dto.id}`;

    const connection = await pool.getConnection();

    try {
      await connection.query(query);

      return { mensagem: 'Guiche foi cancelado com sucesso!' };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao cancelar atendimento');
    } finally {
      if (connection) connection.release();
    }
  }
}

module.exports = GuicheService;
