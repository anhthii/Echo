const { request, pageQuery } = require('utils');
const PageParser = require('lib/Page');

module.exports = function getAlbums(req, res, next) {
  const { genre, id, page } = req.query;
  request(`http://mp3.zing.vn/the-loai-album/${genre}/${id}.html?${pageQuery(page)}`)
    .then(html => {
      const parser = new PageParser(html);

      parser
        .list('.row.fn-list .album-item')
        .setKey('album')
        .extractAttr('src', 'img', 'cover')
        .extractAttrs(['text', 'href', 'href'], '.fn-name.fn-link', ['title', 'id', 'alias'])
        .artist('.txt-info.fn-artist a')
        .paginate();
      res.json(parser.get());
    })
    .catch(err => next(err));
};

