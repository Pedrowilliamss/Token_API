/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const pool = require('../db/dbConfig');
const { quantidade } = require('../utils/variaveis');

class SenhaService {
  async criaSenha(dto) {
    const { tipoSenha } = dto;
    let quantidadeAtual;
    let errorMessage;

    const prioridadeQuery = 'SELECT id_prioridade FROM prioridade WHERE prioridade = ?';
    const senhaInsert = 'INSERT INTO senha VALUES (default, 1, ?, ?, default, null )';

    const connection = await pool.getConnection();
    const dataAtual = new Date();

    let dia = dataAtual.getDate();
    if (dia < 10) {
      dia = `0${dia}`;
    }
    let mes = dataAtual.getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }

    let ano = dataAtual.getFullYear();
    ano = ano.toString().slice(2);

    await connection.beginTransaction();

    try {
      let [idPrioridade] = await connection.query(prioridadeQuery, [tipoSenha]);

      if (idPrioridade.length === 0) {
        errorMessage = `Tipo de senha ${tipoSenha} não reconhecida. Utilize: SG para senha geral, SP para senha preferêncial, SE para senha de exame`;
        throw new Error();
      }
      idPrioridade = idPrioridade[0].id_prioridade;

      quantidadeAtual = quantidade.getQuantidadeAtual(tipoSenha);
      if (quantidade.getQuantidadeAtual(tipoSenha) < 10) {
        quantidadeAtual = `0${quantidade.getQuantidadeAtual(tipoSenha)}`;
      }

      const senha = `${ano}${mes}${dia}-${tipoSenha}${quantidadeAtual}`;

      const [resultado] = await connection.query(senhaInsert, [idPrioridade, senha]);

      const idSenha = resultado.insertId;

      quantidade.setQuantidadeAtual(tipoSenha);

      await connection.commit();

      return { senha, idSenha };
    } catch (err) {
      await connection.rollback();
      console.error(err);

      if (errorMessage) throw new Error(errorMessage);
      if (err instanceof Error) throw new Error(err.message);

      throw new Error('Falha ao criar nova senha');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaSenha(dto) {
    let query = 'SELECT * FROM senha_view';
    const condicoes = [];

    const connection = await pool.getConnection();

    if (dto.status) condicoes.push(`status = "${dto.status}"`);
    if (dto.prioridade) condicoes.push(`prioridade = "${dto.prioridade}"`);
    if (dto.guiche) condicoes.push(`guiche = "${dto.guiche}"`);

    if (condicoes.length > 0) {
      query += ` WHERE ${condicoes.join(' AND ')}`;
    }

    try {
      const [resultado] = await connection.query(query);
      const quantidadeResultado = resultado.length;

      console.log(query);
      return { quantidadeResultado, resultado };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao buscar senha');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaSenhaAtiva() {
    const query = 'SELECT id_senha,senha FROM senha WHERE id_status = 1';
    const connection = await pool.getConnection();

    try {
      const [resultado] = await connection.query(query);
      const quantidadeResultado = resultado.length;

      console.log(query);
      return { resultado, quantidadeResultado };
    } catch (err) {
      console.error(err);
      throw new Error('Erro ao buscar senhas ativas');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaSenhaId(dto) {
    const { id } = dto;
    const query = 'SELECT senha, id_status FROM senha WHERE id_senha = ?';

    const connection = await pool.getConnection();

    try {
      const [resultado] = await connection.query(query, [id]);

      if (resultado.length === 0) throw new Error(`Não existe uma senha com o id ${id}`);

      if (resultado[0].id_status === '4') return { mensagem: `A senha ${resultado[0].senha} está cancelada` };

      console.log(query);
      return { senha: resultado[0].senha };
    } catch (err) {
      console.error(err);
      if (err instanceof Error) throw err;
      throw new Error('Falha ao buscar senha');
    } finally {
      if (connection) connection.release();
    }
  }

  async cancelaSenha(dto) {
    const { id } = dto;
    const connection = await pool.getConnection();

    try {
      await connection.query(`UPDATE senha SET id_status = 4 WHERE id_senha = ${id}`);
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao cancelar senha');
    } finally {
      if (connection) connection.release();
    }
  }
}

module.exports = SenhaService;
