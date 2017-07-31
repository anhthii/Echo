const Playlist = require('models/user_playlist');

module.exports =  (req, res, next) => {
  const { username, playlistTitle } = req.params;
  Playlist.findOneAndUpdate(
    { _username: username, 'playlists.title': playlistTitle },
    { $pull: { playlists: { title: playlistTitle } } },
    { new: true, projection: { 'playlists._id': false } }
  )
  .then(doc => res.json(doc.playlists))
  .catch(err => next(err));
};
