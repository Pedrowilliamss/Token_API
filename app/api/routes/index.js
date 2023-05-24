/* eslint-disable arrow-parens */
/* eslint-disable import/no-extraneous-dependencies */
const bodyParser = require('body-parser');
const tokenRouter = require('./tokenRouter');

module.exports = app => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    tokenRouter,
  );
};
