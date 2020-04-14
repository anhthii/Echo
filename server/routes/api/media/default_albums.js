const Scraper = require("lib/PageScraper");
const request = require("utils").request;
const { ECHO_API } = require("const");
const rp = require("request-promise");

module.exports = function getDefaultAlbums(req, res, next) {
  rp(`${ECHO_API}/album/default`)
    .then((resp) => res.send(resp))
    .catch((err) => next(err));
};
