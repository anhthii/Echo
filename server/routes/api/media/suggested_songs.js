const axios = require('axios');
const Page = require('lib/Page');

module.exports = function getSuggestedSongs(req, res, next) {
  const { id } = req.params;
  const url = `http://mp3.zing.vn/json/song/get-song-suggest?id=${id}&start=0&length=10`;
  // use axios instead of request cuz this site is not gzipped

  axios
    .get(url, { headers: { 'Content-Type': null } }) // prevent rewriting the header
    .then(resp => resp.data.html)
    .then(html => {
      const parser = new Page(html, { decodeEntities: true });
      parser
        .setRoot('.widget.widget-countdown')
        .list('.fn-list .fn-item')
        .setKey('song')
        .extractAttr('src', '.fn-thumb', 'thumb')
        .extractAttrs(['text', 'href'], '.song-name a', ['songName', 'id'])
        .artist('.singer-name a');
      res.json(parser.get());
    })
    .catch(err => next(err));
};