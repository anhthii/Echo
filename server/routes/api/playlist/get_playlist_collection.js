const co = require('co');
const Playlist = require('models/user_playlist');

module.exports = (req, res, next) => {
  co(function* () {
    const doc = yield Playlist.findOne(
      { _username: req.params.username },
      { 'playlists._id': false }
    );
    // create a new playlist collection for the user if he/she hasn't created any yet

    if (doc) { return doc.playlists; }
    const playlist = new Playlist({
      _username: req.params.username,
      playlists: [],
    });

    yield playlist.save();
    return [];
  })
  .then(collection => res.json(collection))
  .catch(err => next(err));
};
