const { Router } = require('express');
const AtendimentoController = require('../controllers/atendimentoController');

const router = Router();

router
  .get('/atendimento', AtendimentoController.buscaAtendimento)
  .get('/atendimento/id/:id', AtendimentoController.buscaAtendimentoId)
  .post('/atendimento', AtendimentoController.novoAtendimento)
  .delete('/atendimento/cancela/:id', AtendimentoController.cancelaAtendimento);

module.exports = router;
