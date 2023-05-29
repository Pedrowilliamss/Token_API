const AtendimentoService = require('../services/atendimentoService');

const atendimentoService = new AtendimentoService();

class AtendimentoController {
  static async novoAtendimento(req, res) {
    const dto = req.body;

    if ((Object.keys(dto).length === 0) || !dto.idGuiche) return res.status(400).json({ mensagem: 'O Id do guiche não foi informado' });

    try {
      const resultado = await atendimentoService.novoAtendimento(dto);

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async buscaAtendimento(req, res) {
    const dto = req.body;
    const { guiche, prioridade, status } = req.query;

    if (guiche) dto.guiche = guiche;
    if (prioridade) dto.prioridade = prioridade;
    if (status) dto.status = status;

    try {
      const { quantidadeResultado, resultado } = await atendimentoService.buscaAtendimento(dto);

      return res.status(201).json({ qtd_resultados: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ messagem: err.message });
    }
  }

  static async buscaAtendimentoId(req, res) {
    const dto = req.params;

    if ((dto.length === 0) || !dto.id) throw new Error('Id não foi foi fornecido ou é invalido');

    try {
      const atendimento = await atendimentoService.buscaAtendimentoId(dto);

      return res.status(200).json({ atendimento });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async cancelaAtendimento(req, res) {
    const dto = req.params;

    if ((Object.keys(dto).lenght === 0) || !dto.id) throw new Error('Id não foi fornecido');

    try {
      const resultado = await atendimentoService.cancelaAtendimento(dto);

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }
}

module.exports = AtendimentoController;
