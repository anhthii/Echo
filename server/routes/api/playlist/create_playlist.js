const co = require('co');
const Playlist = require('models/user_playlist');

module.exports = (req, res, next) => {
  const { username } = req.params;
  const title = req.body.title;
  co(function* () {
    const docs = yield Playlist.findOne(
      { _username: username },
      { playlists: { $elemMatch: { title } } }
    );

    const isPlaylistExisting = docs.playlists.length;

    if (isPlaylistExisting) {
      const error = new Error(`${title} playlist already exists`);
      error.status = 400;
      throw error;
    }

    const New = yield Playlist.findOneAndUpdate(
      { _username: username },
      { $push: { playlists: { title, songs: [] } } },
      { safe: true, upsert: true, new: true }
      // return the updated docs
    );

    return New;
  })
  .then(doc => res.json(doc))
  .catch(err => next(err));
};
