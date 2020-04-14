const { request } = require("utils");

module.exports = function getSuggestedSongs(req, res, next) {
  const { songId, artistId } = req.query;
  const url = `https://mp3.zing.vn/xhr/recommend?target=%23block-recommend&count=20&start=0&artistid=${artistId}&type=audio&id=${songId}`;
  request(url)
    .then(body => {
      const data = JSON.parse(body);
      res.json(data);
    })
    .catch(err => next(err));
};
