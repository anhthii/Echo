// const redisClient = require('lib/Redis');
const { request } = require("utils");
const rp = require("request-promise");
const { ECHO_API } = require("const");

module.exports = function getTop100(req, res, next) {
  const [popId, kpopId, vpopId] = ["ZWZB96AB", "ZWZB96DC", "ZWZB969E"];
  let id;

  switch (req.params.type) {
    case popId:
      id = popId;
      break;
    case kpopId:
      id = kpopId;
      break;
    case vpopId:
      id = vpopId;
      break;
    default:
  }

  // const pageNum = req.query.page;
  // const start = pageNum ? (pageNum - 1) * 20 : 0;
  rp(`${ECHO_API}/tracks/${id}`)
    .then((resp) => res.send(resp))
    .catch((err) => next(err));
};
