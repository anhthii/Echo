const express = require('express');
// controllers
const getPlaylistCollection = require('./get_playlist_collection');
const getPlaylist = require('./get_playlist');
const createPlaylist = require('./create_playlist');
const deletePlaylist = require('./delete_playlist');
const addSongToPlaylist = require('./add_song_to_playlist');
const deleteSongFromPlaylist = require('./delete_song');

const router = express.Router();

const isValidUser = (req, res, next) => {
  if (req.currentUser.username !== req.params.username) {
    return res.status(401).send('You are not allowed to access this route');
  }
  return next();
};

// get user playlist collection
router.get('/:username', isValidUser, getPlaylistCollection);

// get a specific playlist with title
router.get('/:username/:title', isValidUser, getPlaylist);

// create a playlist
router.post('/:username', isValidUser, createPlaylist);

// delete a playlist
router.delete('/:username/:playlistTitle', isValidUser, deletePlaylist);

// add a song to a playlist
router.put('/:username/:playlistTitle', isValidUser, addSongToPlaylist);

// delete a song from a playlist
router.delete('/:username/:playlistTitle/:songId', isValidUser, deleteSongFromPlaylist);

// get a playlist by a specific id

module.exports = router;
