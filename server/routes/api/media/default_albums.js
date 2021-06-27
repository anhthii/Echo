const Scraper = require("lib/PageScraper");
const request = require("utils").request;
require('dotenv').config();
var crypt = require("lib/Crypto");
const { ECHO_API } = require("const");
const rp = require("request-promise");

module.exports = function getDefaultAlbums(req, res, next) {
  console.log("defaul album");

  var ctime =Math.round((new Date).getTime() / 1e3);
  var version = process.env.VERSION_ZING_MP3;
  var para_256 = `ctime=${ctime}version=${version}`;
  var part_url = crypt.getHmac512("/api/v2/album/getByGenreHome"+crypt.getHash256(para_256),"882QcNXV4tUZbvAsjmFOHqNC1LpcBRKW");

  const url = `https://zingmp3.vn/api/v2/album/getByGenreHome?&ctime=${ctime}&version=${version}&sig=${part_url}&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`;

  request(url)
    .then(response => {
      response = JSON.parse(response);
      res.send(response.data);
    })
    .catch(err => next(err));
};
