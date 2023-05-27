/* eslint-disable class-methods-use-this */
const pool = require('../db/dbConfig');

class FilaService {
  async proximoFila() {
    const connection = await pool.getConnection();

    try {
      const [resultado] = await connection.query('SELECT * FROM senha WHERE ativo = 1');

      return resultado;
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao chamar o próximo da fila');
    }
  }
}

module.exports = FilaService;
