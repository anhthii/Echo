function reg1(pattern) {
  return /\[(.+)](.+)/.exec(pattern);
}
function reg2(pattern) {
  return /\[(.+)]/.exec(pattern);
}

function returnLyric(data) {
  const string = data.toString();
  let stringArray = string.split('\r');

  stringArray = stringArray.filter((line) => line.length > 1);

  const syncResult = [];

  for (let i = 0; i < stringArray.length; i++) {
    const check = stringArray[i];
    const obj = {};

    if (reg1(check) && reg2(stringArray[i + 1])) {
      obj.start = convertTime(reg1(check)[1]);
      obj.end = convertTime(reg2(stringArray[i + 1])[1]);
      obj.text = reg1(check)[2];
      syncResult.push(obj);
    }
  }
  return syncResult;
}

function convertTime(string) {
  string = string.split(':');
  if (parseInt(string[0], 10) > 0) {
    const num = (parseInt(string[0], 10) * 60) + parseFloat(string[1]);
    return num.toString();
  }
  return string[1];
}

module.exports = returnLyric;