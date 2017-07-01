const { request } = require('../../../utils');
const PageParser = require('../../../lib/Page');

module.exports = function getAlbumPlaylist(req, res, next) {
  const { title, id } = req.query;
  request(`http://mp3.zing.vn/album/${title}/${id}.html`)
    .then(html => {
      const parser = new PageParser(html);
      parser
        .extract('src', '.info-top-play img', 'album_playlist_thumb')
        .extract('text', '.ctn-inside > h1', 'album_title')
        .extract('text', '.info-song-top .inline', 'release_year')
        .extract('text', '.info-artist > h2 > a', 'artist')
        .extract('src', '.box-artist img', 'artist_thumb')
        .extract('text', '.artist-info-text > p', 'artist_info')
        .list('.playlist .fn-song')
        .setKey('song')
        .extractAttrs(['href', 'href', 'text'], '.fn-name', ['id', 'alias', 'title'])
        .artist('.wrap-h4 h4 a');

      const result = parser.get();
      result.genres = [];
      parser
        .$('.info-song-top').find('a')
        // prepend album artist to the result
        .each((index, a) => result.genres.push(parser.$(a).text()));

      res.json(result);
    })
    .catch(err => next(err));
};
