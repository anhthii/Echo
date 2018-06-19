const BaseScraper = require('./BaseScraper');
const util = require('util');

/**
 * @description model
 *  {
      "songs": [
        {
          "title": "What do you mean?",
          "id": "69797",
          "artist": "Justin Bieber"
        },
        {
          "title": "We don't talk any more",
          "id": "69797",
          "artist": "Charlie Purth
        },
      ]
    }
 */

function PageScraper(...args) {
  BaseScraper.apply(this, args);
  this.key = ''; // key can be a noun for a list of result  such as <songs, videos, albums>
  this.attrs = {}; //  attributes that will be extracted from the element
  this.elements = []; // dom array
}

util.inherits(PageScraper, BaseScraper);

// static methods
PageScraper.pluralize = function (string) {
  return `${string}s`;
};

/**
 * @description get the list of element from the $(selector)
 * @param <string> selector
*/

PageScraper.prototype.list = function (selector) {
  // test the validation of the passed selector see if it has the prefix '.' or '#'
  this.testSelector(selector);
  this.elements = this.$(selector);
  return this;
};

/**
 * @description pluralize the output key
 * @param <string> key
 * Ex: this.setKey('song');
 * { 'songs': [] }
*/

PageScraper.prototype.setKey = function (key) {
  if (/s$/.test(key)) {
    this.key = key;
  } else {
    this.key = PageScraper.pluralize(key);
  }
  return this;
};

/**
 * @description define attributes that will be extracted
 * @param <string> attr
 * @param <string> selector
 * @param outputKey <string> the output key for the documents such as <title, id, artists>
 * Ex: this.key('song');
 * { 'songs': [] }
*/

PageScraper.prototype.extractAttr = function (attr, selector, outputKey, manipulateFunc) {
  this.attrs[selector] = this.attrs[selector] || [];
  const obj = { attr, outputKey };

  if (typeof manipulateFunc === 'function') {
    obj.manipulateFunc = manipulateFunc;
  }

  this.attrs[selector].push(obj);
  return this;
};

/*
  Ex: this.extractAttr('href', '._trackLink', 'link')
  this.extractAttr('text', '._trackLink', 'title')
  this.extractAttr('text', '.trackRelease', 'releaseDate')

  this.attrs
  -> {
    "._trackLink": [
      {attr: 'href', outputKey: 'link'},
      {attr: 'text', outputKey: 'title'}
    ],
    ".trackRelease": [
      {attr: 'text', outputKey: 'releaseDate' }
    ]
  }
*/


/**
 * @description extract multipe attributes
 * @param {<Array> of attrs} attrs
 * @param <Array> outputKeys in order of attrs that will be extracted
 */

PageScraper.prototype.extractAttrs = function (attrs, selector, outputKeys) {
  this.attrs[selector] = [];
  attrs.forEach((attr, index) => {
    this.attrs[selector].push({
      attr,
      outputKey: outputKeys[index],
    });
  });
  return this;
};

// special function for extracting artists, see the BaseScraper lib for more details
PageScraper.prototype.artist = function (selector) {
  this.extractAttr(null, selector, 'artists');
  return this;
};


PageScraper.prototype.getAttrs = function () {
  return this.attrs;
};

// get page number of the document incase the page has a pagination
// only for scraping http://mp3.zing.vn purpose

PageScraper.prototype.paginate = function () {
  const lastPage = this.$('.pagination ul li').last().children()[0];
  if (lastPage) {
    const lastPageHref = lastPage.attribs.href;
    this.result.numberOfPages = parseInt(/\d+$/g.exec(lastPageHref)[0], 10);
  } else {
    this.result.numberOfPages = 1;
  }
};


function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

PageScraper.prototype.get = function () {
  this.result[this.key] = [];
  this.elements.each((index, element) => {
    const doc = {};
    const selectors = Object.keys(this.attrs);
    selectors.forEach(selector => {
      if (hasOwnProperty(this.attrs, selector)) {
        const arr = this.attrs[selector];
        const $el = this.$(element).find(selector);
        arr.forEach(obj => {
          const { attr, outputKey, manipulateFunc } = obj;
          if (outputKey === 'id' || outputKey === 'alias') {
            // get the song id and alias
            const match = /\/([0-9A-Za-z_-]+)\/(\w+)\.html$/.exec(this.attr($el, attr));
            const [, alias, id] = match;
            doc[outputKey] = outputKey === 'id' ? id : alias;
          } else {
            doc[outputKey] = this.attr($el, attr, manipulateFunc);
          }
        });
      }
    });
    this.result[this.key].push(doc);
  });
  return this.result;
};

module.exports = PageScraper;
