const SenhaService = require('../services/senhaService');

const senhaService = new SenhaService();

class SenhaController {
  static async criaSenha(req, res) {
    const dto = req.body;

    if (!dto || !dto.tipoSenha) return res.status(400).json({ mensagem: 'O tipo da senha não foi informado' });

    try {
      const { senha, idSenha } = await senhaService.criaSenha(dto);

      return res.status(201).json({ mensagem: 'Senha criada com sucesso', data: { senha, idSenha } });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaSenha(req, res) {
    const dto = req.body;
    const { status, prioridade, guiche } = req.query;

    if (status) dto.status = status;
    if (prioridade) dto.prioridade = prioridade;
    if (guiche) dto.guiche = guiche;

    try {
      const { resultado, quantidadeResultado } = await senhaService.buscaSenha(dto);

      return res.status(200).json({ qtd_resultado: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaSenhaAtiva(req, res) {
    try {
      const { resultado, quantidadeResultado } = await senhaService.buscaSenhaAtiva();

      return res.status(200).json({ qtd_resultados: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaSenhaId(req, res) {
    const dto = req.params;

    if ((Object.keys(dto).length === 0) || !dto.id) return res.status(400).json({ mensagem: 'Id não foi fornecido' });

    try {
      const resultado = await senhaService.buscaSenhaId(dto);

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async cancelaSenha(req, res) {
    const dto = req.params;

    if (Object.keys(dto).length === 0 || !dto.id) {
      return res.status(400).json({ mensagem: 'id não foi fornecido' });
    }

    try {
      await senhaService.cancelaSenha(dto);

      return res.status(200).json({ mensagem: 'Senha cancelada com sucesso' });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }
}

module.exports = SenhaController;
