const { request, spliceOne } = require("utils");
const rp = require("request-promise");
const { ECHO_API } = require("const");

module.exports = function (req, res, next) {
  const { term } = req.query;
  rp(`${ECHO_API}/search?term=${term}`)
    .then((resp) => res.send(resp))
    .catch((err) => next(err));
};
