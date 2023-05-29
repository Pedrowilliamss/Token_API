const { Router } = require('express');
const GuicherController = require('../controllers/guicheController');

const router = Router();

router
  .get('/guiche', GuicherController.buscaGuiche)
  .post('/guiche', GuicherController.criaGuiche)
  .put('/guiche', GuicherController.atualizaGuiche)
  .delete('/guiche/cancela/:id', GuicherController.cancelaGuiche);

module.exports = router;
