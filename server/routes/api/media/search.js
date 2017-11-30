const { request, spliceOne } = require('utils');

module.exports = function (req, res, next) {
  const { term } = req.query;
  const url = `https://ac.mm.mp3.zing.vn/complete/desktop?type=artist,album,video,song&num=3&query=${term}`;
  request(url)
    .then(data => {
      data = JSON.parse(data);
      spliceOne(data.data, 2); // delete video section

      data.data = data.data.reduce((newObj, obj) => {
        const key = Object.keys(obj)[0];
        newObj[key] = obj[key];
        return newObj;
      }, {});

      if (data.top && data.top.type === 'video') {
        // return top result with a blank object if the type is 'video'
        data.top = Object.create(null);
      }

      res.json(data);
    })
    .catch(err => next(err));
};
