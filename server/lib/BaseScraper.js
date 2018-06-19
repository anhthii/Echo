/**
 *@description a library that can scrape anything from http://mp3.zing.vn
 *@author anhthi https://github.com/dkakashi69
*/

const cheerio = require('cheerio');

function BaseScraper(...args) {
  const [html, opt] = args;
  this.$ = opt ? cheerio.load(html, opt) : cheerio.load(html);
  this.result = {};
  this.$root = this.$('body');
}

BaseScraper.prototype.setRoot = function (rootSelector) {
  this.$root = this.$(rootSelector);
  return this;
};

BaseScraper.prototype.testSelector = function (attr) {
  if (!/^(#||\.)/.test(attr)) {
    throw new TypeError('you missed # or .');
  }
};

BaseScraper.prototype.extract = function (attr, selector, outputKey) {
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

BaseScraper.prototype.extractList = function (attrs, selector, ouputKey) {
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

/**
 * @param {DOM | required} $el
 * @param {String | required} arttr
 *@param {function | optional} manipulate
*/

BaseScraper.prototype.attr = function ($el, attr, manipulateFunc) {
  function extract(atrib, e) {
    function shouldManipulateResult(result) {
      return typeof manipulateFunc === 'function' ? manipulateFunc(result) : result;
    }

    return atrib === 'text'
    ? shouldManipulateResult(e.text().trim())
    : shouldManipulateResult(e.attr(atrib));
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

BaseScraper.prototype.get = function () {
  return this.result;
};

module.exports = BaseScraper;

