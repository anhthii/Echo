const { request } = require('utils');
const Scraper = require('lib/PageScraper');
const co = require('co');

module.exports = function getAlbumPlaylist(req, res, next) {
  const { title, id } = req.query;
  co(function* () {
    const html = yield request(`http://mp3.zing.vn/album/${title}/${id}.html`);
    const regex = /media\/get-source\?type=album&key=.{33}/; // get the resouce url
    const match = html.match(regex);
    if (!match) throw new Error("can't find the resource URL");
    const [playlistUrl] = match;
    const parser = new Scraper(html);

    return yield Promise.all([
      request(`https://mp3.zing.vn/xhr/${playlistUrl}`),
      promiseParsing(parser),
    ]);
  })
  .then(([playlistRawText, result]) => {
    result.songs = JSON.parse(playlistRawText).data.items;
    res.json(result);
  })
  .catch(err => next(err));
};

const promiseParsing = (parser) => {
  return new Promise(resolve => {
    parser
        .extract('src', '.info-top-play img', 'album_playlist_thumb')
        .extract('text', '.ctn-inside > h1', 'album_title')
        .extract('text', '.info-song-top .inline', 'release_year')
        .extract('text', '.info-artist > h2 > a', 'artist')
        .extract('src', '.box-artist img', 'artist_thumb')
        .extract('text', '.artist-info-text > p', 'artist_info')
        .list('.playlist .fn-song')
        .setKey('song')
        .extractAttrs(['href', 'href', 'text'], '.item-song h3 .fn-name', ['id', 'alias', 'title'])
        .artist('.item-song .fn-artist a');
    const result = parser.get();
    result.genres = [];
    parser
      .$('.info-song-top').find('a')
      // prepend album artist to the result
      .each((index, a) => result.genres.push(parser.$(a).text()));
    resolve(result);
  });
};
