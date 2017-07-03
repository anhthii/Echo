const { request } = require('../../../utils');

module.exports = function (req, res, next) {
  const { id } = req.params;

  request(`http://mp3.zing.vn/json/charts?op=get&type=song&id=${id}`)
    .then(data => res.json(JSON.parse(data)))
    .catch(err => next(err));
};