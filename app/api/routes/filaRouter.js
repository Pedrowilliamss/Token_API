const { Router } = require('express');
const FilaControleler = require('../controllers/filaController');

const router = Router();

router
  .get('/fila', FilaControleler.proximoFila);

module.exports = router;
