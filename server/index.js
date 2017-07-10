const express = require('express');
const bodyParser = require('body-parser');
const database = require('./lib/Database');
const api = require('./routes/api');
const needAuth = require('./middlewares/authenticate');

const app = express();
database.init();

// middlewares
app.use(bodyParser.json());

app.use('/api', api);
app.get('/secret', needAuth, (req, res) => {
  res.json(req.currentUser);
});

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
    if (err.errors || err.message) {
      res.json({ error: true, errors: err.errors, message: err.message });
    } else {
      res.send(err.stack);
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: true,
    errors: err.errors || {},
    message: err.message || '',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server is listening on port ' + PORT));
