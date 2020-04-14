const { request } = require("utils");
// const redisClient = require('lib/Redis');
// const { getRedisKey } = require('utils');
const { ECHO_API } = require("const");

module.exports = function (req, res, next) {
  const { id } = req.params;

  request(`${ECHO_API}/chart/${id}`)
    .then((data) => {
      // redisClient.set(getRedisKey(req), data, 'EX', 60 * 60 * 24 * 5);
      res.json(JSON.parse(data));
    })
    .catch((err) => next(err));
};
