const { request } = require('utils')
const ZingMP3 = require('../../../lib/ZingMP3')

/*server ECHO_SPI drop so use direct from zing mp3*/
module.exports = function getAlbums(req, res, next) {
  const { id, page } = req.query

  const url = ZingMP3.composeURL(ZingMP3.V2.resources.album, {
    id,
    type: 'genre',
    sort: 'listen',
    page: page || 1,
    count: 20
  })

  request(url)
    .then((response) => {
      response = JSON.parse(response)
      res.send(response.data)
    })
    .catch((err) => next(err))
}
