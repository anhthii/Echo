const PageScraper = require("lib/PageScraper");
const rp = require("request-promise");
const { ECHO_API } = require("const");

module.exports = function getDefaultArtists(req, res, next) {
  rp(`${ECHO_API}/artist-genre/default`)
    .then((resp) => res.send(resp))
    .catch(next);
};
