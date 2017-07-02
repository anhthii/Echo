const express = require('express');
const getSong = require('./song');
const getSuggestedSongs = require('./suggested_songs');
const getTop100 = require('./top100');
const search = require('./search');
const getDefaultAlbums = require('./default_albums');
const getAlbums = require('./albums');
const getAlbumPlaylist = require('./album_playlist');
const getDefaultArtists = require('./default_artists');
const getArtist = require('./artist');

const router = express.Router();

router.get('/song', getSong);

router.get('/suggested-song/:id', getSuggestedSongs);

router.get('/top100/:type', getTop100);

router.get('/search', search);

router.get('/album/default', getDefaultAlbums);

router.get('/album', getAlbums);

router.get('/album_playlist', getAlbumPlaylist);

router.get('/artist/default', getDefaultArtists);

router.get('/artist/:name/:type', getArtist);


module.exports = router;
