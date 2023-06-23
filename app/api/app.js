const express = require('express');
const routes = require('./routes');
const db = require('./models/index');

const app = express();
const port = process.env.PORT || 3000;

routes(app);

app.listen(port, () => {
  console.log(`Api rodando na url: http://localhost:${port}`);
});

module.exports = app;
