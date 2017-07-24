// Add the root project directory to the app module search path
require('app-module-path').addPath(__dirname);
const api = require('./routes/api');
const download = require('./routes/download');

module.exports = function (app) {
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
      console.log(err);
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
    res.status(err.status || 500);
    if (err.errors && Object.keys(err.errors).length) {
      res.json({
        error: true,
        errors: err.errors || {},
      });
    } else {
      res.send(err.message);
    }
  });
};
