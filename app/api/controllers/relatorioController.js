const RelatorioService = require('../services/relatorioService');

const relatorioService = new RelatorioService();

class RelatorioController {
  static async buscaRelatorioMensal(req, res) {
    try {
      const { resultado, quantidadeResultado } = await relatorioService.buscaRelatorioMensal();
      return res.status(200).json({ qtd_resultado: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaRelatorioDiario(req, res) {
    try {
      const { resultado, quantidadeResultado } = await relatorioService.buscaRelatorioDiario();
      return res.status(200).json({ qtd_resultado: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaRelatorioSenha(req, res) {
    try {
      const { resultado, quantidadeResultado } = await relatorioService.buscaRelatorioSenha();
      return res.status(200).json({ qtd_resultado: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }
}

module.exports = RelatorioController;
