/* eslint-disable class-methods-use-this */
const pool = require('../db/dbConfig');

class TokenService {
  async criaSenha(dto) {
    const { tipoSenha } = dto;

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

    const anoInteiro = dataAtual.getFullYear();
    const ano = anoInteiro.toString().slice(2);

    await connection.beginTransaction();

    try {
      const [resultadoId] = await connection.query(`SELECT id_prioridade FROM prioridade WHERE prioridade = "${tipoSenha}"`);
      const idPrioridade = resultadoId[0].id_prioridade;

      const [resultadoQA] = await connection.query(`SELECT quantidade_atual FROM quantidade_senha WHERE id_prioridade = ${idPrioridade}`);
      const [resultadoQM] = await connection.query(`SELECT quantidade_total FROM quantidade_senha WHERE id_prioridade = ${idPrioridade}`);

      let quantidade = resultadoQA[0].quantidade_atual;
      let quantidadeTotal = resultadoQM[0].quantidade_total;

      if (quantidade >= 99) {
        quantidade = 0;
        await connection.query(`UPDATE quantidade_senha SET quantidade_atual = ${quantidade}`);
      }
      quantidade += 1;
      quantidadeTotal += 1;

      await connection.query(`UPDATE quantidade_senha SET quantidade_atual = ${quantidade}, quantidade_total = ${quantidadeTotal} WHERE id_prioridade = ${idPrioridade}`);

      if (quantidade < 10) {
        quantidade = `0${quantidade}`;
      }

      const senha = `${ano}${mes}${dia}-${tipoSenha}${quantidade}`;

      const [resultado] = await connection.query(`INSERT INTO senha VALUES (default, 1,${idPrioridade}, "${senha}", 1 )`);

      const idSenha = resultado.insertId;

      await connection.commit();

      return { senha, idSenha };
    } catch (err) {
      await connection.rollback();
      console.error(err);
      throw new Error('Falha ao criar nova senha');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaSenha() {
    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.query('SELECT id_senha,senha FROM senha WHERE ativo = 1');
      return rows;
    } catch (err) {
      console.error(err);
      throw new Error('Erro ao buscar senhas ativas');
    } finally {
      if (connection) connection.release();
    }
  }

  async buscaSenhaId(dto) {
    const { id } = dto;

    const connection = await pool.getConnection();

    try {
      const [resultado] = await connection.query(`SELECT senha, ativo FROM senha WHERE id_senha = ${id}`);

      if (resultado[0].ativo === '0') return { mensagem: `A senha ${resultado[0].senha} está desabilitada` };

      return { senha: resultado[0].senha };
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao buscar senha');
    } finally {
      if (connection) connection.release();
    }
  }

  async cancelaSenha(dto) {
    const { senha } = dto;
    const connection = await pool.getConnection();

    try {
      await connection.query(`UPDATE senha SET ativo = 0 where senha = "${senha}"`);
    } catch (err) {
      console.error(err);
      throw new Error('Falha ao cancelar senha');
    }
  }
}

module.exports = TokenService;
