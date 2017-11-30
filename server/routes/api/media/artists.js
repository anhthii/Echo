const { request, pageQuery } = require('utils');
const PageParser = require('lib/Page');

module.exports = function getAlbums(req, res, next) {
  const { genre, id, page } = req.query;
  request(`http://mp3.zing.vn/the-loai-nghe-si/${genre}/${id}.html?${pageQuery(page)}`)
    .then(html => {
      const parser = new PageParser(html);

      parser
        .list('.pone-of-five .item')
        .setKey('artist')
        .extractAttr('src', 'img', 'thumb')
        .extractAttr('text', 'a.txt-primary', 'name')
        .paginate();

      res.json(parser.get());
    })
    .catch(err => next(err));
};

