const { request, pageQuery } = require("utils");
const Scraper = require("lib/PageScraper");
require('dotenv').config();
var crypt = require("lib/Crypto")
const { ECHO_API } = require("const");
const rp = require("request-promise");
const request_total = require('request');



/*server ECHO_SPI drop so use direct from zing mp3*/
module.exports = function getAlbums(req, res, next) {
  const { genre, id, page } = req.query;
  var total;

  var page_query = page? page: 1;
  var count = 20;
  var ctime =Math.round((new Date).getTime() / 1e3);
  var version = process.env.VERSION_ZING_MP3;
  var para_256 = `count=${count}ctime=${ctime}id=${id}page=${page_query}type=genreversion=${version}`;
  var part_url = crypt.getHmac512("/api/v2/album/getList"+crypt.getHash256(para_256),"882QcNXV4tUZbvAsjmFOHqNC1LpcBRKW");
  const url = `https://zingmp3.vn/api/v2/album/getList?id=${id}&type=genre&page=${page_query}&count=${count}&sort=listen&ctime=${ctime}&version=${version}&sig=${part_url}&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`;
  //request get total length
  console.log(url);
    request(url)
      .then(response => {
        response = JSON.parse(response);
        res.send(response.data);
      })
      .catch(err => next(err));


};
