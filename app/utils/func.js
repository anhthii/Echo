export function isTwoObjectEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function changeAlias(alias) {
  const arrStr = alias.split("");
  function change(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|=|<|>|\?|\/|,|\.|:|;|'|'|&|#|\[|\]|~|$|_/g,
      "-"
    );
    str = str.replace(/-+-,/g, "-");
    str = str.replace(/^-+|-+$/g, "");
    str = str.replace(/\s+/g, "-");
    return str;
  }

  for (let i = 0; i < arrStr.length; i++) {
    if (arrStr[i].toUpperCase() === arrStr[i]) {
      arrStr[i] = change(arrStr[i].toLowerCase()).toUpperCase();
    } else {
      arrStr[i] = change(arrStr[i]);
    }
  }

  return arrStr.join("").replace(/-+/g, "-");
}

export function getSongUrl(name, id) {
  if (!/\s+/.test(name)) {
    // if there is no space therefore the name argument is already escaped
    return `/song/${name}/${id}`;
  }
  return `/song/${changeAlias(name)}/${id}`;
}

export function pageQuery(page) {
  return page ? `?page=${page}` : "";
}

export function range(r) {
  const arr = [];
  for (let i = 0; i < r; i++) {
    arr.push(i);
  }
  return arr;
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function findIndex(arr, entry, value) {
  for (let i = 0, length = arr.length; i < length; i++) {
    if (arr[i][entry] === value) return i;
  }
  return undefined;
}

export function removeById(arr, id) {
  if (isObject(arr[0])) {
    arr.splice(findIndex(arr, "id", id), 1);
    return arr;
  }

  arr.splice(arr.indexOf(id), 1);
  return arr;
}

function padZero(number) {
  return number <= 9 ? `0${number}` : number.toString();
}

export function formatTime(s) {
  const min = Math.floor(s / 60);
  const second = Math.floor(s) % 60;
  return `${min}:${padZero(second)}`;
}

const EOL = typeof window === "undefined" ? require("os").EOL : "\n";

/**
 *
 * @param {string} data
 * @example [length: 03:36]
 * @return {<Array>{string}} ['length', '03:06']
 */

function extractInfo(data) {
  const info = data.trim().slice(1, -1); // remove brackets: length: 03:06
  return info.split(": ");
}

export function lrcParser(data) {
  if (typeof data !== "string") {
    throw new TypeError("expect first argument to be a string");
  }
  // split a long stirng into lines by system's end-of-line marker line \r\n on Windows
  // or \n on POSIX
  var lines = data.split(EOL);
  const timeStart = /\[(\d*\:\d*\.?\d*)\]/; // i.g [00:10.55]
  const scriptText = /(.+)/; // Havana ooh na-na (ayy)
  const timeEnd = timeStart;
  const startAndText = new RegExp(timeStart.source + scriptText.source);

  const infos = [];
  const scripts = [];
  const result = {};

  for (var i = 0; startAndText.test(lines[i]) === false; i++) {
    infos.push(lines[i]);
  }

  infos.reduce((result, info) => {
    const [key, value] = extractInfo(info);
    result[key] = value;
    return result;
  }, result);

  lines.splice(0, infos.length); // remove all info lines
  const qualified = new RegExp(startAndText.source + "|" + timeEnd.source);
  lines = lines.filter(line => qualified.test(line));

  for (var i = 0, l = lines.length; i < l; i++) {
    const matches = startAndText.exec(lines[i]);
    const timeEndMatches = timeEnd.exec(lines[i + 1]);
    if (matches && timeEndMatches) {
      const [, start, text] = matches;
      const [, end] = timeEndMatches;
      scripts.push({
        start: convertTime(start),
        text,
        end: convertTime(end)
      });
    }
  }

  result.scripts = scripts;
  return result;
}

// convert time string to seconds
// i.g: [01:09.10] -> 69.10
function convertTime(string) {
  string = string.split(":");
  const minutes = parseInt(string[0], 10);
  const seconds = parseFloat(string[1]);
  if (minutes > 0) {
    const sc = minutes * 60 + seconds;
    return parseFloat(sc.toFixed(2));
  }
  return seconds;
}

// Resolve a link to alias
export const extractAlias = function (link) {
  if (!link) {
    return ''
  }

  return link.split('/')[2]
}
