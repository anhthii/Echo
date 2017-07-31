const co = require('co');
const Playlist = require('models/user_playlist');

module.exports = (req, res, next) => {
  const { username, playlistTitle } = req.params;
  co(function* () {
    const isSongExisting = yield Playlist.findOne(
      {
        _username: username,
        playlists: {
          $elemMatch: {
            title: playlistTitle,
            songs: {
              $elemMatch: { id: req.body.id },
            },
          },
        },
      }
    );

    if (isSongExisting) {
      const error = new Error(`<span>${req.body.title}</span> song already exists in <span>${playlistTitle}</span> playlist`);
      error.status = 400;
      throw error;
    }

    const New = yield Playlist.findOneAndUpdate(
      { _username: username, 'playlists.title': playlistTitle },
      { $push: { 'playlists.$.songs': req.body } },
      // upsert add the document to the collection if no result was found
      { safe: true, upsert: true, new: true }
    );

    return New;
  })
  .then(doc => res.json(doc))
  .catch(err => next(err));
};
