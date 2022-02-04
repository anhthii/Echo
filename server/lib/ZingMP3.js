const Crypto = require("./Crypto");
const querystring = require("querystring");
const { ZING_MP3_VERSION, ZING_MP3_SECRET, ZING_MP3_API_KEY } = process.env;

const V2 = {
  host: "https://zingmp3.vn",

  resources: {
    album: "/api/v2/song/get/list",
    defaultAlbums: "/api/v2/page/get/hub-home",
    chart: "/api/v2/page/get/week-chart",
    search: "/api/v2/search/multi",
    getStream: "/api/v2/song/get/streaming",
    getDetail: "/api/v2/page/get/playlist",
  },
};

// composeParamsMessage used for generating for signature
// { ctime: 2131414, id: 'testid' } => ctime=213414id=tesid
const composeParamMessage = (paramStr) => {
  const urlParams = new URLSearchParams(paramStr);
  // sort params by key
  const sortedKeys = Array.from(urlParams.keys()).sort();
  const pickOnly = ["id", "type", "page", "count", "ctime", "version"];
  return sortedKeys
    .filter((key) => pickOnly.includes(key))
    .map((key) => `${key}=${urlParams.get(key)}`)
    .join("");
};

const computeSignature = (paramStr, resourcePath) => {
  const paramMessage = composeParamMessage(paramStr);

  const hash = Crypto.createHash256(paramMessage);
  const signature = Crypto.createHmac512(resourcePath + hash, ZING_MP3_SECRET);
  return signature;
};

// compose an api url with computed signature
const composeURL = (resourcePath, params) => {
  params.ctime = ctime();
  params.version = ZING_MP3_VERSION;

  let paramStr = querystring.stringify(params);

  const signature = computeSignature(paramStr, resourcePath);

  const extendedParams = {
    ...params,
    sig: signature,
    apiKey: ZING_MP3_API_KEY,
  };

  paramStr = querystring.stringify(extendedParams);
  const url = V2.host + resourcePath + "?" + paramStr;
  return url;
};

const ctime = () => {
  return String(Math.floor(new Date() / 1e3));
};

module.exports = {
  V2,
  composeURL,
};
