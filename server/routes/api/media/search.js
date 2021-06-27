const { request } = require('utils')
const ZingMP3 = require('../../../lib/ZingMP3')

module.exports = function (req, res, next) {
  const { term } = req.query;
  const url = ZingMP3.composeURL(ZingMP3.V2.resources.search,{q: term});

  request(url)
    .then(response => {
      response = JSON.parse(response);
      res.send(response);
    })
    .catch(err => next(err));
};
