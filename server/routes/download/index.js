const express = require("express");
const co = require("co");
const rp = require("request-promise");
const { ECHO_API } = require("const");
const { request } = require("../../utils");
const router = express.Router();

router.get("/song/:songTitle/:id", (req, res, next) => {
  const { songTitle, id } = req.params;

  rp(`${ECHO_API}/streaming/${id}`)
    .then((resp) => JSON.parse(resp))
    .then((resource) => {
      const songURI = `http:${resource.data.default["128"]}`;
      res.header(
        "Content-disposition",
        `attachment; filename=${songTitle}.mp3`
      );
      request(songURI).pipe(res);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
