/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const pool = require('../db/dbConfig');
const { prioridadeAtual } = require('../utils/variaveis');

class AtendimentoService {
  async novoAtendimento(dto) {
    const { idGuiche } = dto;
    const connection = await pool.getConnection();

    connection.beginTransaction();

    try {
      const prioridade = prioridadeAtual.getIdUltimaPrioridade();

      let senha;

      const atendimentoInsert = 'INSERT INTO atendimento VALUES (default, 2, ?, ?, default, null)';
      const atendimentoUpdate = 'UPDATE atendimento JOIN senha ON atendimento.id_senha = senha.id_senha SET atendimento.id_status = 3, atendimento.temp_fim = current_timestamp(), senha.id_status = 3 WHERE atendimento.id_status = 2 AND atendimento.id_guiche = ?';
      const senhaUpdate = 'UPDATE senha SET id_status = 2, temp_atendido = default WHERE id_senha = ?';
      const senhaQuery = 'SELECT id_senha, senha FROM senha WHERE id_status = 1 AND id_prioridade = ? ORDER BY temp_criado ASC LIMIT 1';
      const guicheQuery = 'SELECT descricao FROM guiche WHERE id_guiche = ?';

      const [guiche] = await connection.query(guicheQuery, [idGuiche]);

      if (prioridade === 2) {
        [senha] = await connection.query(senhaQuery, [1]);
        if (senha.length === 1) prioridadeAtual.setIdUltimaPrioridade(1);

        if (senha.length === 0) {
          [senha] = await connection.query(senhaQuery, [3]);
          prioridadeAtual.setIdUltimaPrioridade(senha ? 2 : 1);
        }
      } else {
        [senha] = await connection.query(senhaQuery, [3]);
        if (senha.length === 1) prioridadeAtual.setIdUltimaPrioridade(2);

        if (senha.length === 0) {
          [senha] = await connection.query(senhaQuery, [2]);
          prioridadeAtual.setIdUltimaPrioridade(senha ? 2 : 1);
        }
      }

      if (senha.length === 0) {
        [senha] = await connection.query(senhaQuery, [2]);
        prioridadeAtual.setIdUltimaPrioridade(senha ? 2 : 1);
      }

      if (senha.length === 0) {
        [senha] = await connection.query(senhaQuery, [1]);
        prioridadeAtual.setIdUltimaPrioridade(senha ? 1 : 2);
      }

      if (senha.length === 0) {
        await connection.query(atendimentoUpdate, [idGuiche]);
        connection.commit();
        throw new Error('Fila vazia');
      }

      await connection.query(atendimentoUpdate, [idGuiche]);
      await connection.query(senhaUpdate, [senha[0].id_senha]);
      await connection.query(atendimentoInsert, [senha[0].id_senha, idGuiche]);

      connection.commit();

      return { idSenha: senha[0].id_senha, senha: senha[0].senha, guiche: guiche[0].descricao };
    } catch (err) {
      await connection.rollback();
      console.error(err);
      if (err.message === 'Fila vazia') throw new Error(err.message);
      throw new Error('Falha ao chamar o próximo da fila');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaAtendimento(dto) {
    const connection = await pool.getConnection();
    let query = 'SELECT * FROM atendimento_view';
    const condicoes = [];

    if (dto.status) condicoes.push(`status = "${dto.status}"`);
    if (dto.prioridade) condicoes.push(`prioridade = "${dto.prioridade}"`);
    if (dto.guiche) condicoes.push(`guiche = "${dto.guiche}"`);

    if (condicoes.length > 0) {
      query += ` WHERE ${condicoes.join(' AND ')}`;
    }

    try {
      const [resultado] = await connection.query(query);

      const quantidadeResultado = resultado.length;

      return { quantidadeResultado, resultado };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao buscar atendimentos');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaAtendimentoId(dto) {
    const { id } = dto;
    const query = `SELECT * FROM atendimento_view WHERE id_Atendimento = ${id} LIMIT `;

    const connection = await pool.getConnection();

    try {
      const [resultado] = await connection.query(query);

      if (resultado.length === 0) throw new Error(`Atendimento com ${id} não foi encontrado`);

      return resultado;
    } catch (err) {
      console.error(err);
      if (err instanceof Error) throw err;
      throw new Error('Falha ao buscar atendimento');
    }
  }

  async cancelaAtendimento(dto) {
    const query = `UPDATE atendimento SET id_status = 4 WHERE id_atendimento = ${dto.id}`;

    const connection = await pool.getConnection();

    try {
      const [resultado] = await connection.query(query);

      return resultado;
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao cancelar atendimento');
    } finally {
      if (connection) connection.release();
    }
  }
}
module.exports = AtendimentoService;
