const client = require('../lib/Redis');
const { getRedisKey } = require('../utils');

module.exports = function cached(req, res, next) {
  client.get(getRedisKey(req), (err, data) => {
    if (err) next(err);
    if (data) {
      console.log('cached');
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};
