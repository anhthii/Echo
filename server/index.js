// Add the root project directory to the app module search path
require('app-module-path').addPath(__dirname);

const express = require('express');
const bodyParser = require('body-parser');
const database = require('./lib/Database');
const api = require('./routes/api');
const download = require('./routes/download');

const app = express();
database.init();

// middlewares
app.use(bodyParser.json());

app.use('/api', api);
app.use('/download', download);


// Not found route
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.errors) {
      res.json({ error: true, errors: err.errors, message: err.message });
    } else {
      res.send(err.stack);
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    error: true,
    errors: err.errors || {},
    message: err.message || '',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server is listening on port ' + PORT));
