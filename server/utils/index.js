const rp = require('request-promise');

exports.request = function (uri) {
  return rp({
    method: 'GET',
    uri,
    gzip: true,
    headers: {
      'Cookie': 'Cookie:tuser=0; _znu=1; fuid=7ef2a13f150ef44591c654ecff5e1f9c; acn=applifemobi; uin=o0379505450; otp=LOGIN_SUCCESSFULLY; _zg=10|1495762568; crtg_vng_rta=bmi72890%3D1%3Bbmi300250H%3D1%3Bnwz300600%3D1%3Bzoom300600%3D1%3Bmobmi32050%3D1%3Bmonwz300250%3D1%3Bmobmi300250%3D1%3Bztv97090%3D1%3Bztvcb97090%3D1%3Bm3z300600%3D1%3Bm3zah300250%3D1%3Bm3zap300250%3D1%3Bztv970250%3D1%3Blbn300250%3D1%3Blbn72890%3D1%3Blbn300600%3D1%3Blbn97090%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3Blbn970250%3D1%3B; SRVID=s5838_8132; __mp3sessid=6E011FB222F5; _gat_mp3=1; _zploc=A1934569181; _gat=1; _zmp3=0.47515787922049757; ___sessid=9043.2571826811.3431439251.1496914563.4007988979; __sessid=7102.2571824870.3431437310.1496914563; atmpv=6; adtimaUserId=2000.eb86895795f37cad25e2.1487780095569.d7476a82; ___zlid=JgwH8e7TF9dAgMwLQyw4WRblhaGNoW4OA9XJX6yruiOlPxow9WGsmEvJgDrAE9KY; BANNER_OFF=; __zi=2000.eb86895795f37cad25e2.1487780095569.d7476a82; _ga=GA1.2.960951047.1492310231; _gid=GA1.2.1283077211.1496754598',
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

