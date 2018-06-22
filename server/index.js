const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const debug = require('debug');

const info = debug('server:app:info');
const error = debug('server:app:error');
const database = require('./lib/Database');
const routes = require('./app');

const app = express();
const server = http.createServer(app);
app.disable('x-powered-by');

database
  .init()
  .then(() => info('connected to database'))
  .catch(err => error(err));

// middlewares
const env = app.get('env');
if (env === 'production') {
  app.use(morgan('common', {
    // skip: (req, res) => res.statusCode < 400,
    stream: path.resolve(__dirname, '/../morgan.log'),
  }));
} else {
  app.use(morgan('dev'));
}

app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.json());

// routes
routes(app);

process.on('uncaughtException', (err) => {
  error('crashed!!! - ' + (err.stack || err));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
