const client = require('../lib/Redis');

module.exports = function cached(req, res, next) {
  client.get(req.params.id || req.params.type, (err, data) => {
    if (err) next(err);
    if (data) {
      console.log(req.params.id || req.params.type);
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};
