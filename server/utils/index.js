const rp = require('request-promise');
const request = require('request');

async function getHeaders() {
    const options = {
      url: 'https://zingmp3.vn/',
      method: 'GET',
    };

    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.get(options, function(err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(response.headers);
        }
      })
    })
  }



exports.request = async function (uri) {
  const headers = await getHeaders();
  const version = headers["set-cookie"][0].split(";")[0];
  const requestId = headers["set-cookie"][1].split(";")[0];

  return rp({
    method: 'GET',
    uri,
    gzip: true,
    headers: {
      'cookie': version+";"+requestId,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      'Access-Control-Allow-Origin': 'https://zingmp3.vn',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type':'application/json;charset=utf-8',
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

