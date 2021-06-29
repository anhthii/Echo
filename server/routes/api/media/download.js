const { request } = require('utils')
const ZingMP3 = require('../../../lib/ZingMP3')


module.exports= function downloadSong(req, res, next){
    const {id} = req.query;
    const url = ZingMP3.composeURL(ZingMP3.V2.resources.getStream,{id});

    request(url)
    .then(response => {
      response = JSON.parse(response);
      if(response.msg == "Success"){
        res.send(response.data);
      }
      else{
        res.send({});
      }
    })
    .catch(err => next(err));

}