/* eslint-disable arrow-parens */
/* eslint-disable import/no-extraneous-dependencies */
const bodyParser = require('body-parser');
const senhaRouter = require('./senhaRouter');
const atendimentoRouter = require('./atendimentoRouter');
const guicheRouter = require('./guicheRouter');
const relatorioRouter = require('./relatorioRouter');

module.exports = app => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    senhaRouter,
    atendimentoRouter,
    guicheRouter,
    relatorioRouter,
  );
};
