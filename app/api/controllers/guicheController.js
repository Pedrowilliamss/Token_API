const GuicheService = require('../services/guicheService');

const guicheService = new GuicheService();

class GuicherController {
  static async buscaGuiche(req, res) {
    try {
      const { resultado, quantidadeResultado } = await guicheService.buscaGuiche();

      return res.status(200).json({ qtd_resultado: quantidadeResultado, data: resultado });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async criaGuiche(req, res) {
    const dto = req.body;

    if ((Object.keys(dto).lenght === 0) || !dto.descricao) throw new Error('Descrição do guiche não foi definida');

    try {
      const resultado = await guicheService.criaGuiche(dto);

      return res.status(201).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async atualizaGuiche(req, res) {
    const dto = req.body;

    if (!dto.descricao || !dto.idGuiche) throw new Error('descricao ou idGuiche não foram fornecidos');

    try {
      const resultado = await guicheService.atualizaGuiche(dto);

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }

  static async cancelaGuiche(req, res) {
    const dto = req.params;

    if ((Object.keys(dto).lenght === 0) || !dto.id) throw new Error('Id não foi fornecido');

    try {
      const resultado = await guicheService.cancelaGuiche(dto);

      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }
}

module.exports = GuicherController;
