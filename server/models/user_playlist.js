const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  artists: { type: Schema.Types.Mixed, required: true }, // string or array
  url_alias: String,
});

const PlaylistSchema = new Schema({
  songs: [SongSchema],
  title: { type: String, required: true },
});

const UserPlaylistSchema = new Schema({
  playlists: [PlaylistSchema],
  _userId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('UserPlaylist', UserPlaylistSchema);
