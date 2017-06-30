/**
 *@description a library that can scrape anything from http://mp3.zing.vn
 *@author anhthi https://github.com/dkakashi69
*/

const cheerio = require('cheerio');

function DOMParser(...args) {
  const [html, opt] = args;
  this.$ = opt ? cheerio.load(html, opt) : cheerio.load(html);
  this.result = {};
  this.$root = this.$('body');
}

DOMParser.prototype.setRoot = function (rootSelector) {
  this.$root = this.$(rootSelector);
  return this;
};

DOMParser.prototype.testSelector = function (attr) {
  if (!/^(#||\.)/.test(attr)) {
    throw new TypeError('you missed # or .');
  }
};

DOMParser.prototype.extract = function (attr, selector, outputKey) {
  this.testSelector(selector); // test the attr to see if it is valid
  const $el = this.$root.find(selector);
  const data = this.attr($el, attr);
  this.result[outputKey] = data;
  return this;
};

/**
 *@description extract a list of attributes from the selected element
 *@param {array} or {string} attrs Ex: ['text', 'href'] or 'text'
*/

DOMParser.prototype.extractList = function (attrs, selector, ouputKey) {
  this.result[ouputKey] = [];
  this.$(selector).each((index, e) => {
    if (!Array.isArray(attrs)) {
      this.result[ouputKey].push(this.attr(this.$(e), attrs));
    } else {
      const result = [];
      attrs.forEach(attr => {
        result.push(this.attr(this.$(e), attr));
      });
      this.result[ouputKey].push(result);
    }
  });
};

DOMParser.prototype.attr = function ($el, attr) {
  // attr is null for "artists" cuz we extract both text and link attribute by default
  function extract(atrib, e) {
    return atrib === 'text' ? e.text().trim() : e.attr(atrib);
  }
  // check is $el array of artist element
  if (attr === null) {
    const arr = [];
    $el.each((index, e) => {
      const reg = /(\/nghe-si\/|http:\/\/mp3\.zing.vn\/nghe-si\/)/;
      arr.push({
        alias: extract('href', this.$(e)).replace(reg, ''), // get only the alias
        name: extract('text', this.$(e)),
      });
    });
    return arr;
  }
  return extract(attr, $el);
};

DOMParser.prototype.get = function () {
  return this.result;
};

module.exports = DOMParser;

