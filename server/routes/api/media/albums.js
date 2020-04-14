const { request, pageQuery } = require("utils");
const Scraper = require("lib/PageScraper");
const { ECHO_API } = require("const");
const rp = require("request-promise");

module.exports = function getAlbums(req, res, next) {
  const { genre, id, page } = req.query;
  rp(`${ECHO_API}/album/${id}`)
    .then(resp => res.send(resp))
    .catch(err => next(err));
};
