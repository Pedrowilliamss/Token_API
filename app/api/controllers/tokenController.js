const TokenService = require('../services/tokenService');

const tokenService = new TokenService();

class TokenController {
  static async criaSenha(req, res) {
    const dto = req.body;

    if (!dto || !dto.tipoSenha) return res.status(400).json({ mensagem: 'O tipo da senha não foi informado' });

    try {
      const { senha, idSenha } = await tokenService.criaSenha(dto);

      return res.status(201).json({ mensagem: 'Senha criada com sucesso', data: { senha, idSenha } });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaSenha(req, res) {
    try {
      const resultado = await tokenService.buscaSenha();

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaSenhaId(req, res) {
    const dto = req.params;

    if ((Object.keys(dto).length === 0) || !dto.id) return res.status(400).json({ mensagem: 'Id não foi fornecido' });

    try {
      const resultado = await tokenService.buscaSenhaId(dto);

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async cancelaSenha(req, res) {
    const dto = req.body;

    if (Object.keys(dto).length === 0 || !dto.senha) {
      return res.status(400).json({ mensagem: 'Senha não foi fornecida' });
    }

    try {
      await tokenService.cancelaSenha(dto);

      return res.status(200).json({ mensagem: 'Senha cancelada com sucesso' });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }
}

module.exports = TokenController;
