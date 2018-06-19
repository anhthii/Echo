const PageScraper = require('lib/PageScraper');
const request = require('utils').request;

module.exports = function getDefaultArtists(req, res, next) {
  request('http://mp3.zing.vn/the-loai-nghe-si')
    .then(html => {
      const parser = new PageScraper(html);
      const result =
        parser
          .list('.zcontent .title-section')
          .setKey('origin')
          .extractAttrs(['text', 'href'], 'a', ['title', 'id'])
          .get();
          // result.origins is now available
      // minimize html

      html = parser.$('.zcontent').html();

      result.origins = result.origins.map((origin, index) => {
        const innerParser = new PageScraper(html);
        // rewrite the parser elements
        innerParser.elements = parser.list('.row.fn-list').elements.eq(index).find('.artist-item');
        innerParser
          .setKey('artist') // the key will be artists
          .extractAttr('src', 'img', 'thumb')
          .extractAttrs(['href', 'text'], 'a.txt-primary', ['link', 'name']);

        return Object.assign(origin, innerParser.get());
      });

      res.json(Object.assign({ result: true }, result));
    })
    .catch(err => next(err));
};
