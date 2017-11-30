// const redisClient = require('lib/Redis');
const { request } = require('utils');

module.exports = function getTop100(req, res, next) {
  const [popId, kpopId, vpopId] = ['ZWZB96AB', 'ZWZB96DC', 'ZWZB969E'];
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
  const uri = `https://mp3.zing.vn/xhr/media/get-list?op=top100&start=${start}&length=20&id=${id}`;
  request(uri)
    .then(response => {
      response = JSON.parse(response);
      if (start === 0) {
        // this will fetch all of the 100 songs so we have to truncate it down to 20
        response.data.items.length = 20; // this won't casue any memory leaks
      }
      // redisClient.set(getRedisKey(req), data, 'EX', 60 * 60 * 24 * 5); // cache the data for 5 days
      res.send(response);
    })
    .catch(err => next(err));
};
