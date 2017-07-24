const express = require('express');
const Playlist = require('models/user_playlist');
const co = require('co');

const router = express.Router();


// get all playlists
router.get('/:username', (req, res, next) => {
  Playlist.findOne({ _username: req.params.username })
  .then(doc => res.json(doc.playlists))
  .catch(err => next(err));
});

// get a specific playlist with title
router.get('/:username/:title', (req, res, next) => {
  const { username, title } = req.params;

  Playlist.findOne(
    { _username: username, 'playlists.title': title },
    { 'playlists.$': 1 }
  )
  .then(playlist => res.json(playlist))
  .catch(err => next(err));
});

// initialize playlist placeholder for user
router.post('/', (req, res, next) => {
  const username = req.body.username;
  Playlist.findOne({ _username: username })
    .then(user => {
      if (user) { return res.status(400).send(`${username} playlist collection already exists`); }

      const playlist = new Playlist({
        _username: username,
        playlists: [],
      });

      playlist.save()
        .then((playlists) => res.json(playlists))
        .catch(err => next(err));
    })
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
      { new: true } // return the updated docs
    );

    return New;
  })
  .then(playlists => res.json(playlists))
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
      const error = new Error(`${req.body.title} songs already exists in ${playlistTitle} playlist`);
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
  .then(playlists => res.json(playlists))
  .catch(err => next(err));
});

// delete a song from a playlist
router.delete('/:username/:playlistTitle/:songId', (req, res, next) => {
  const { username, playlistTitle, songId } = req.params;
  Playlist.findOneAndUpdate(
    { _username: username, 'playlists.title': playlistTitle },
    { $pull: { 'playlists.$.songs': { id: songId } } },
    { new: true }
  )
  .then(playlist => res.json(playlist))
  .catch(err => next(err));
});

// get a playlist by a specific id


module.exports = router;
