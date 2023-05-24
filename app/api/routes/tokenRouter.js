const { Router } = require('express');
const TokenController = require('../controllers/tokenController');

const router = Router();

router
  .post('/AS/criaSenha', TokenController.criaNovaSenha);

module.exports = router;
