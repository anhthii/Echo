
export function isTwoObjectEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function changeAlias(alias) {
  const arrStr = alias.split('');
  function change(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|=|<|>|\?|\/|,|\.|:|;|'|'|&|#|\[|\]|~|$|_/g,'-');
    str = str.replace(/-+-,/g,'-');
    str = str.replace(/^-+|-+$/g, '');
    str = str.replace(/\s+/g, '-');
    return str;
  }

  for (let i = 0; i < arrStr.length; i++) {
    if (arrStr[i].toUpperCase() === arrStr[i]) {
      arrStr[i] = change(arrStr[i].toLowerCase()).toUpperCase();
    } else {
      arrStr[i] = change(arrStr[i]);
    }
  }

  return arrStr.join('').replace(/-+/g, '-');
}

export function getSongUrl(name, id) {
  if (!/\s+/.test(name)) {
    // if there is no space therefore the name argument is already escaped
    return `/song/${name}/${id}`;
  }
  return `/song/${changeAlias(name)}/${id}`;
}

export function pageQuery(page) {
  return page ? `?page=${page}` : '';
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
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function findIndex(arr, entry, value) {
  for (let i = 0, length = arr.length; i < length; i++) {
    if (arr[i][entry] === value) return i;
  }
  return undefined;
}

export function removeById(arr, id) {
  if (isObject(arr[0])) {
    arr.splice(findIndex(arr, 'id', id), 1);
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
