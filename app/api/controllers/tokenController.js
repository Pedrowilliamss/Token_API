const pool = require('../db/dbConfig');
const TokenService = require('../services/tokenService');

const tokenService = new TokenService();

class TokenController {
  static async criaSenha(req, res) {
    const { tipoSenha } = req.body;

    if (!tipoSenha) {
      res.status(400).json({ mensagem: 'O tipo da senha não foi informado' });
    }

    try {
      const { senha, idSenha } = await tokenService.criaSenha(tipoSenha);

      res.status(201).json({ mensagem: 'Senha criada com sucesso', data: { senha, idSenha } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao criar a senha' });
    }
  }

  static async cancelaSenha(req, res) {
    const { senha } = req.body;

    const connection = await pool.getConnection();

    try {
      const { verificaSenha } = await connection.query(`SELECT senha from senha where senha = ${senha}`);

      console.log(verificaSenha);
      return res.status(200).json({ mensagem: verificaSenha });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro ao cancelar a senha' });
    }
  }
}

module.exports = TokenController;
