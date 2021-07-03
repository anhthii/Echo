// const redisClient = require('lib/Redis');
const { request } = require("utils");
const rp = require("request-promise");
const ZingMp3 = require("../../../lib/ZingMP3");
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

  const pageNum = req.query.page;
  const start = pageNum ? (pageNum - 1) * 20 : 0;
 
  const url = ZingMp3.composeURL(ZingMp3.V2.resources.getDetail, {id})
  
  //get All 100 data from Zingmp3 Detail id
  request(url)
    .then(response => {
      response = JSON.parse(response);
      //only fetch 20 items
      response.data.song.items = response.data.song.items.splice(start,20);
      res.send({items : response.data.song.items});
    })
    .catch(err => next(err));
};
