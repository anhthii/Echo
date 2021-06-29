const express = require('express');
const getSong = require("./song");
const downloadSong = require("./download");
const getSuggestedSongs = require('./suggested_songs');
const getTop100 = require('./top100');
const search = require('./search');
const getDefaultAlbums = require('./default_albums');
const getAlbums = require('./albums');
const getArtists = require('./artists');
const getAlbumPlaylist = require('./album_playlist');
const getDefaultArtists = require('./default_artists');
const getArtist = require('./artist');
const getChart = require('./chart');
// const cached = require('middlewares/cached');

const router = express.Router();

router.get('/song', getSong);

router.get('/download', downloadSong);

router.get('/suggested-song', getSuggestedSongs);

router.get('/top100/:type', getTop100);

router.get('/search', search);

router.get('/albums/default', getDefaultAlbums);

router.get('/albums', getAlbums);

router.get('/album_playlist', getAlbumPlaylist);

router.get('/artists/default', getDefaultArtists);

router.get('/artists', getArtists);

router.get('/artist/:name/:type', getArtist);

router.get('/chart/:id', getChart);

module.exports = router;
