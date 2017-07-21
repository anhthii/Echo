const express = require('express');
const Playlist = require('models/user_playlist');
const mongoose = require('mongoose');

const router = express.Router();

// create a playlist
router.post('/', (req, res, next) => {
  const { userId, playlistTitle } = req.body;
  const playlist = new Playlist({
    _userId: mongoose.Types.ObjectId(userId),
    playlists: [
      {
        title: playlistTitle,
        songs: [],
      },
    ],
  });

  playlist.save()
    .then((playlists) => res.json(playlists))
    .catch(err => next(err));
});

// get a playlist by a specific id
router.get('/:id', (req, res, next) => {
  Playlist.find(
    { 'playlists._id': req.params.id }, // { playlists: [ { _id: ''} ] }
    { 'playlists.$': 1 } // returns only the first element
  ).then(playlist => res.json(playlist))
  .catch(err => next(err));
});

// add a song to a playlist
router.put('/:userId/:playlistId', (req, res, next) => {
  const { userId, playlistId } = req.params;
  Playlist.findOneAndUpdate(
    { _userId: userId, 'playlists._id': playlistId },
    { $push: { 'playlists.$.songs': req.body } },
    // upsert add the document to the collection if no result was found
    { safe: true, upsert: true }
  )
  .then(playlist => res.json(playlist))
  .catch(err => next(err));
});

module.exports = router;
