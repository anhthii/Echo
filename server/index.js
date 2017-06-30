const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const PORT = 3000;

const app = express();

// middlewares
app.use(bodyParser.json());

app.use('/api', api);


//
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
    res.send(err.stack || err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: true,
    message: err.message,
  });
});

app.listen(PORT, () => console.log('server is listening on port ' + PORT));