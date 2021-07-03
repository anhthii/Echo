const { request, pageQuery } = require('utils');
const Scraper = require('lib/PageScraper');
const cheerio = require("cheerio");
const rp = require("request-promise");

module.exports = function getDefaultArtists(req, res, next) {
  request(`http://mp3.zing.vn/the-loai-nghe-si`).then(html => {
    const parser = new Scraper(html);

    parser
      .list(".title-section")
      .setKey("titles")
      .extractAttr("title", "a", "title").get();

    const data = parser
      .list('.pone-of-five .item')
      .setKey('artist')
      .extractAttr('src', 'img', 'thumb')
      .extractAttr('text', 'a.txt-primary', 'name')
      .extractAttr('href', 'a', 'link')
      .get();


    const artists = [...data.artists];
    const items = [];
    while(artists.length){
      items.push(artists.splice(0,10));
    }

    const response = items.map((item, index) => {
      return {
        title: data.titles[index].title,
        items: item
      }
    })

    res.json({origins : response});
  })
  .catch(err => next(err));
};
