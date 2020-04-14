const co = require("co");
const { request } = require("utils");
const rp = require("request-promise");
const lrcParser = require("lrc-parser");

const { ECHO_API } = require("const");

module.exports = function getSong(req, res, next) {
  const { id } = req.query;
  // TO DO: use async await when targeting node 8.0

  // co(function*() {
  //   const html = yield request(
  //     `https://mp3.zing.vn/bai-hat/${name}/${id}.html`
  //   );
  //   const regex = /key=.{33}/; // get the resouce url
  //   const match = html.match(regex);

  //   if (!match) throw new Error("can't find the resource URL");

  //   const [matchUrl] = match;
  //   return {
  //     url: "https://mp3.zing.vn/xhr/media/get-source?type=audio&" + matchUrl
  //   };
  // })
  //   .then(data => res.json(data))
  //   .catch(err => next(err));
  rp(`${ECHO_API}/song/${id}`)
    .then((resp) => res.send(resp))
    .catch((err) => next(err));
};
