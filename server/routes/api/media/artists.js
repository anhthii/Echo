const { request, pageQuery } = require("utils");
const Scraper = require("lib/PageScraper");
const { ECHO_API } = require("const");

module.exports = function getAlbums(req, res, next) {
  const { genre, id, page } = req.query;
  request(`${ECHO_API}/artist-genre/${id}`)
    .then((resp) => res.send(resp))
    .catch((err) => next(err));
};
