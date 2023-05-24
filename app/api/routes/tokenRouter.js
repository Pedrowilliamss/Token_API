const { Router } = require('express');
const TokenController = require('../controllers/tokenController');

const router = Router();

router
  .get('/token')
  .post('/token', TokenController.criaSenha)
  .delete('/token');

module.exports = router;
