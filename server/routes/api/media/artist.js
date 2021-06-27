const PageScraper = require("lib/PageScraper");
const { request } = require("utils");
const cheerio = require("cheerio");
const rp = require("request-promise");
const { ECHO_API } = require("const");

const rq = (type, name, page) => {
  if (page) {
    return request(`http://mp3.zing.vn/nghe-si/${name}/${type}?&page=${page}`);
  }

  return request(`http://mp3.zing.vn/nghe-si/${name}/${type}`);
};

module.exports = function getArtist(req, res, next) {
  const { name, type } = req.params;
  const { page } = req.query;

  switch (type) {
    case "albums":
      getAlbums(name, res);
      break;

    case "songs":
      getSongs(name, page, res, next);
      break;
    case "biography":
      getBio(name, res, next);
      break;

    default:
  }
};

const getSongs = (name, page, res, next) => {
  rq("bai-hat", name, page)
    .then((html) => {
      const parser = new PageScraper(html);
      parser
        .extract("src", ".box-info-artist img", "avatar")
        .extract("src", ".container > img", "cover")
        .extract("text", ".info-summary > h1", "artistName")
        .list(".group .fn-song")
        .setKey("song")
        .extractAttr('href', "._trackLink", "link")
        .extractAttr("text", "._trackLink", "title", (string) => {
          return string.replace(/\s*-\s*.+/g, "");
        })
        .extractAttr("text", "._trackLink span", "artist_text")
        .paginate();
        
        let data = parser.get();
        data.songs = data.songs.map(item =>{ 
          let link = item.link.split(/[/.]/);
          let alias = link[2];
          let id = link[3];
          return {
            title: item.title,
            artist_text: item.artist_text,
            id: id,
            alias: alias
          }
        })
        res.json(data);
      })
      .catch((err) => next(err));
};

const getAlbums = (name, res, next) => {
  rq("album", name)
    .then((html) => {
      const parser = new PageScraper(html);

      parser
        .extract("src", ".box-info-artist img", "avatar")
        .extract("src", ".container > img", "cover")
        .extract("text", ".info-summary > h1", "artistName")
        .setRoot(".wrap-content")
        .list(".album-item")
        .setKey("album")
        .extractAttr("src", "img", "thumb")
        .extractAttr("text", ".title-item.txt-primary", "title")
        .extractAttr("text", "h4.title-sd-item.txt-info", "artist_text")
        .extractAttrs(["href", "href"], ".thumb._trackLink", ["alias", "id"])
        .paginate();

      res.json(parser.get());
    })
    .catch((err) => next(err));
};

const getBio = (name, res, next) => {
  rq("tieu-su", name)
    .then((html) => {
      const result = {
        fullName: "",
        dateOfBirth: "",
        genres: [],
        country: "",
        description: "",
      };

      const $ = cheerio.load(html);
      const $entry = $(".col-12 .entry");
      const $li = (i) => $entry.find(".hoz-list li").eq(i);

      const avatar = $(".box-info-artist img").attr("src");
      const cover = $(".container > img").attr("src");
      const artistName = $(".info-summary > h1").text();
      const description = $entry.contents().not(".hoz-list").text().trim();
      const fullName = $li(0).text().replace(/.+:/, "").trim();
      const dateOfBirth = $li(1).text().replace(/.+:/, "").trim();
      const country = $li(3).text().trim();

      $li(2)
        .find("a")
        .each((index, value) => {
          result.genres.push($(value).text().trim());
        });

      res.json(
        Object.assign(result, {
          avatar,
          cover,
          description,
          fullName,
          dateOfBirth,
          country,
          artistName,
        })
      );
    })
    .catch((err) => next(err));
};
