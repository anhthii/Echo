const { request } = require("utils");
var cheerio = require('cheerio');
var crypt = require("./Crypto")
require('dotenv').config();
const rp = require("request-promise");
// const { getRedisKey } = require('utils');
const { ECHO_API } = require("const");

module.exports = function (req, res, next) {
  console.log(req.params);
  const { id } = req.params;
  var ctime =Math.round((new Date).getTime() / 1e3);
  var version = process.env.VERSION_ZING_MP3;
  var para_256 = `ctime=${ctime}id=${id}version=${version}`;
  var part_url = crypt.getHmac512("/api/v2/chart/getWeekChart"+crypt.getHash256(para_256),"882QcNXV4tUZbvAsjmFOHqNC1LpcBRKW");
  // console.log(`https://zingmp3.vn/api/v2/chart/getWeekChart?id=${id}&week=0&year=0&ctime=${ctime}&version=1.1.7&sig=${url}&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`);
  const url = `https://zingmp3.vn/api/v2/chart/getWeekChart?id=${id}&week=0&year=0&ctime=${ctime}&version=${version}&sig=${part_url}&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`;


  request(url)
    .then(response => {
      response = JSON.parse(response);
      res.send(response);
    })
    .catch(err => next(err));
  
    
};
