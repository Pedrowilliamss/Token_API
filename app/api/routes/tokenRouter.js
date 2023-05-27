const { Router } = require('express');
const TokenController = require('../controllers/tokenController');

const router = Router();

router
  .get('/token', TokenController.buscaSenha)
  .post('/token', TokenController.criaSenha)
  .delete('/token', TokenController.cancelaSenha);

module.exports = router;
