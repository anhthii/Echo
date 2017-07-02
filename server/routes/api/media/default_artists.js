const PageParser = require('../../../lib/Page');
const request = require('../../../utils').request;

module.exports = function getDefaultArtists(req, res, next) {
  request('http://mp3.zing.vn/the-loai-nghe-si')
    .then(html => {
      const parser = new PageParser(html);
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
        const innerParser = new PageParser(html);
        // rewrite the parser elements
        innerParser.elements = parser.list('.tab-pane').elements.eq(index).find('.pone-of-five');
        innerParser
          .setKey('artist') // the key will be artists
          .extractAttr('src', '.thumb img', 'thumb')
          .extractAttr('href', '.title-item a', 'link');

        return Object.assign(origin, innerParser.get());
      });

      res.json(Object.assign({ result: true }, result));
    })
    .catch(err => next(err));
};