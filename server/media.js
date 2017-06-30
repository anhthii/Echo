const express = require('express');
const axios = require('axios');
const Page = require('./lib/Page');

const app = express();

app.get('/', (req, res) => {
  nrp("http://mp3.zing.vn/album/1-2-3-4-Single-Chi-Dan/ZOZCWC8B.html")
.then(html => {
  const $ = new Page(html);

  $.setType('song')
   .restrict('.playlist .fn-song')
   .setExtractedAttr('text', '.fn-name', 'title')
   .setExtractedAttr('href', '.fn-name', 'link')
   .setExtractedAttr(null, '.wrap-h4 h4 a', 'artists')
   .extract('src', '.info-top-play.group img', 'cover')
   .extract('text', '.ctn-inside > h1', 'albumTitle')
   .extract('text', '.info-song-top .inline', 'release')
   .extract(null, '.info-artist a.artist-track-log', 'artists')
   .extractList('text', '.info-song-top a.genre-track-log', 'genres');


  const result = $.get();
  res.json(result);
})
.catch(err => console.error(err))
});

app.get('/related/:id', (req, res) => {
  const { id } = req.params;
  const url = `http://mp3.zing.vn/json/song/get-song-suggest?id=${id}&start=0&length=10`;
  axios.get(url)
    .then(resp => {
      console.log(resp.headers);
      return resp.data.html;
    })
    .then(html => {
      const parser = new Page(html, { decodeEntities: true });
      parser
        .setRoot('.widget.widget-countdown')
        .restrict('.fn-list .fn-item')
        .setType('song')
        .setExtractedAttr('src', '.fn-thumb', 'thumb')
        .setExtractedAttr('text', '.song-name a', 'songName')
        .setExtractedAttr(null, '.singer-name a', 'artists');

      res.json(parser.get());
    })
    .catch(err => console.log(err));
});

app.listen(4000, function() {
  console.log('server is listening on port 3000');
});
