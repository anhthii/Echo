const { request, pageQuery } = require('utils');
const Scraper = require('lib/PageScraper');
const cheerio = require("cheerio");
const rp = require("request-promise");
const { ECHO_API } = require("const");

module.exports = function getDefaultArtists(req, res, next) {
  request(`http://mp3.zing.vn/the-loai-nghe-si`).then(html => {
    const parser = new Scraper(html);
    
    parser
      .list(".title-section")
      .setKey("titles")
      .extractAttr("title", "a", "title").get();
        
    let data =parser
              .list('.pone-of-five .item')
              .setKey('artist')
              .extractAttr('src', 'img', 'thumb')
              .extractAttr('text', 'a.txt-primary', 'name')
              .extractAttr('href', 'a', 'link')
              .get();
    
    
    // var respone = {
    //   data:[
    //     {
    //       title: "",
    //       items:[]
    //     }
    //   ]
    // }
    var artists = [...data.artists];
    var items =[];
    while(artists.length){
      items.push(artists.splice(0,10));
    }
    var respone = items.map((item, index) => {
      return {
        title: data.titles[index].title,
        items: item
      }
    })

    res.json({origins : respone});
  })
  .catch(err => next(err));
};
