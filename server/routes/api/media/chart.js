const { request } = require('utils')
const ZingMP3 = require('../../../lib/ZingMP3')

module.exports = function (req, res, next) {
  const { id } = req.params;
  console.log("chart", id)
  const url = ZingMP3.composeURL(ZingMP3.V2.resources.chart,{id});

  request(url)
    .then(response => {
      response = JSON.parse(response);
      res.send(response);
    })
    .catch(err => next(err));


};
