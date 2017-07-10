const express = require('express');
const co = require('co');
const { request } = require('../../utils');

const router = express.Router();

router.get('/song/:songTitle/:id', (req, res, next) => {
  const { songTitle, id, filename } = req.params;
  co(function* () {
    const html = yield request(`http://mp3.zing.vn/bai-hat/${filename || songTitle}/${id}.html`);
    const regex = /json\/song\/get-source\/.{24}/; // get the resouce url
    const match = html.match(regex);
    if (!match) throw new Error("can't find the resource URL");

    const [matchUrl] = match;
    const resource = yield request(`http://mp3.zing.vn/${matchUrl}`);
    const data = JSON.parse(resource).data[0];
    const songURI = data.source_list[0];

    res.header('Content-disposition', `attachment; filename=${songTitle}.mp3`);
    request(songURI).pipe(res);
  })
  .catch(err => next(err));
});

module.exports = router;
