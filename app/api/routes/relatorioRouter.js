const { Router } = require('express');
const RelatorioController = require('../controllers/relatorioController');

const router = Router();

router
  .get('/relatorio/mensal', RelatorioController.buscaRelatorioMensal)
  .get('/relatorio/diario', RelatorioController.buscaRelatorioDiario)
  .get('/relatorio/senha', RelatorioController.buscaRelatorioSenha);

module.exports = router;
