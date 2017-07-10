const express = require('express');
const media = require('./media');
const user = require('./user');

const router = express.Router();

router.use('/media', media);
router.use('/user', user);

module.exports = router;