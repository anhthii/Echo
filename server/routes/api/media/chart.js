const { request } = require('utils');
// const redisClient = require('lib/Redis');
// const { getRedisKey } = require('utils');

module.exports = function (req, res, next) {
  const { id } = req.params;

  request(`http://mp3.zing.vn/json/charts?op=get&type=song&id=${id}`)
    .then(data => {
      // redisClient.set(getRedisKey(req), data, 'EX', 60 * 60 * 24 * 5);
      res.json(JSON.parse(data));
    })
    .catch(err => next(err));
};
