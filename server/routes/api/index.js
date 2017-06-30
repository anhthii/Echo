const express = require('express');
const media = require('./media');

const router = express.Router();

router.use('/media', media);

module.exports = router;