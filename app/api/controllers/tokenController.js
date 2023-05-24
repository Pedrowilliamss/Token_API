// const pool = require('../db/dbConfig');
const criaSenha = require('../utils/formataSenha');

class TokenController {
  static async criaNovaSenha(req, res) {
    const { tipoSenha } = req.body;

    if (!tipoSenha) {
      res.status(400).json({ mensagem: 'O tipo da senha não foi informado' });
    }

    try {
      const { senha, idSenha } = await criaSenha(tipoSenha);

      res.status(201).json({ mensagem: 'Senha criada com sucesso', data: { senha, idSenha } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao criar a senha' });
    }
  }
}

module.exports = TokenController;
