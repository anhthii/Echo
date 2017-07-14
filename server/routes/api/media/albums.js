const { request, pageQuery } = require('utils');
const PageParser = require('lib/Page');

module.exports = function getAlbums(req, res, next) {
  const { genre, id, page } = req.query;
  request(`http://mp3.zing.vn/the-loai-album/${genre}/${id}.html?${pageQuery(page)}`)
    .then(html => {
      const parser = new PageParser(html);

      parser
        .list('.row .pone-of-four .item')
        .setKey('album')
        .extractAttr('src', 'img', 'cover')
        .extractAttrs(['text', 'href', 'href'], '.title-item .txt-primary', ['title', 'id', 'alias'])
        .artist('.title-sd-item .txt-info')
        .paginate();

      res.json(parser.get());
    })
    .catch(err => next(err));
};

