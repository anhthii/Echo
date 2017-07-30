const express = require('express');
const Playlist = require('models/user_playlist');
const co = require('co');

const router = express.Router();


// get user playlist collection
router.get('/:username', (req, res, next) => {
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
});

// get a specific playlist with title
router.get('/:username/:title', (req, res, next) => {
  const { username, title } = req.params;

  Playlist.findOne(
    { _username: username, 'playlists.title': title },
    { _id: false, 'playlists._id': false }
  )
  .then(playlist => res.json(playlist))
  .catch(err => next(err));
});

// create a playlist
router.post('/:username', (req, res, next) => {
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
});

// delete a playlist
router.delete('/:username/:playlistTitle', (req, res, next) => {
  const { username, playlistTitle } = req.params;
  Playlist.findOneAndUpdate(
    { _username: username, 'playlists.title': playlistTitle },
    { $pull: { playlists: { title: playlistTitle } } },
    { new: true, projection: { 'playlists._id': false } }
  )
  .then(doc => res.json(doc.playlists))
  .catch(err => next(err));
});

// add a song to a playlist
router.put('/:username/:playlistTitle', (req, res, next) => {
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
});

// delete a song from a playlist
router.delete('/:username/:playlistTitle/:songId', (req, res, next) => {
  const { username, playlistTitle, songId } = req.params;
  Playlist.findOneAndUpdate(
    { _username: username, 'playlists.title': playlistTitle },
    { $pull: { 'playlists.$.songs': { id: songId } } },
    { new: true, projection: { 'playlists._id': false } }
  )
  .then(doc => res.json(doc.playlists))
  .catch(err => next(err));
});

// get a playlist by a specific id


module.exports = router;
