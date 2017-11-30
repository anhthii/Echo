const rp = require('request-promise');

exports.request = function (uri) {
  return rp({
    method: 'GET',
    uri,
    gzip: true,
    headers: {
      'cookie': 'tuser=1; _znu=1; fuid=6d7a775bbc1290d95ae31223458ecdf9; __gads=ID=04874f4f77f1fedc:T=1501580759:S=ALNI_MZY8oCdFKpNU5xfOQ4AFfmAeP4Crg; 360GAME_ACCESS=true; __mp3sessid=62B9F8640663; __zi_local=2000.4d1d715866458e1bd754.1500456779036.2fdcb8cf; _ga=GA1.2.733194616.1500456209; _gid=GA1.2.1941153540.1511055857; __zi=2000.4d1d715866458e1bd754.1500456779036.2fdcb8cf; _zmp3=0.41655397353889256; adtimaUserId=2000.4d1d715866458e1bd754.1500456779036.2fdcb8cf; __acid=7f2011a8c2264ae546e223f5d8ee6c78.760601511533391834.1511006197764.10675f95a59d4ac3138c.991728364',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    },
  });
};

// About 1.5x faster than the two-arg version of Array#splice()
exports.spliceOne = function spliceOne(list, index) {
  for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }
  list.pop();
};

exports.pageQuery = function (page) {
  return page ? `&page=${page}` : '';
};

exports.isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};

exports.getRedisKey = function (req) {
  const pageQuery = req.query.page && `?page=${req.query.page}`;
  const key = `${req.params.id || req.params.type}${pageQuery || ''}`;
  return key;
};

