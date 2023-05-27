const FilaService = require('../services/filaService');

const filaService = new FilaService();

class FilaController {
  static async proximoFila(req, res) {
    try {
      const proximo = await filaService.proximoFila();

      return res.status(200).json({ proximo });
    } catch (err) {
      return res.status(500).json({ mensagem: err.message });
    }
  }
}

module.exports = FilaController;
