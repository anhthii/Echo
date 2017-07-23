const express = require('express');
const bodyParser = require('body-parser');
const database = require('./lib/Database');
const routes = require('./app');

const app = express();
database
  .init()
  .then(() => console.log('connected to database'))
  .catch(err => { throw err; });

// middlewares
app.use(bodyParser.json());

// routes
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server is listening on port ' + PORT));
