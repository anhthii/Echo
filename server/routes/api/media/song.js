const co = require("co");
const { request } = require("utils");

module.exports = function getSong(req, res, next) {
  const { name, id } = req.query;
  console.log(name, id);
  // TO DO: use async await when targeting node 8.0

  co(function*() {
    const html = yield request(
      `https://mp3.zing.vn/bai-hat/${name}/${id}.html`
    );
    const regex = /key=.{33}/; // get the resouce url

    const match = html.match(regex);

    if (!match) throw new Error("can't find the resource URL");

    const [matchUrl] = match;
    return { url: "https://mp3.zing.vn/xhr/media/get-source?type=audio&" + matchUrl };
  })
    .then(data => {
      request(data.url)
        .then(response => {
          response = JSON.parse(response);
          res.json(response.data)})
        })
    .catch(err => next(err));
};
