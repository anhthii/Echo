const express = require('express');
const media = require('./media');
const user = require('./user');
const playlist = require('./playlist');
const requireAuth = require('middlewares/require_authentication');

const router = express.Router();

router.use('/media', media);
router.use('/user', user);
router.use('/playlist', requireAuth, playlist);

module.exports = router;
