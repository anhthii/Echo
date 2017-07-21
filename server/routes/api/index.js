const express = require('express');
const media = require('./media');
const user = require('./user');
const playlist = require('./playlist');

const router = express.Router();

router.use('/media', media);
router.use('/user', user);
router.use('/playlist', playlist);

module.exports = router;
