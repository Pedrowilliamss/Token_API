const { Router } = require('express');
const SenhaController = require('../controllers/senhaController');

const router = Router();

router
  .get('/senha', SenhaController.buscaSenha)
  .get('/senha/fila', SenhaController.buscaSenhaAtiva)
  .get('/senha/id/:id', SenhaController.buscaSenhaId)
  .post('/senha', SenhaController.criaSenha)
  .delete('/senha/cancela/:id', SenhaController.cancelaSenha);

module.exports = router;
