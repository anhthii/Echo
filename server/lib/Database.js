const mongoose = require('mongoose');
require('dotenv').config();

exports.init = function () {
  mongoose.Promise = global.Promise;
  const conn = mongoose.connection;
  mongoose.connect(process.env.MONGODB_URI);
  conn.on('error', console.error.bind(console, 'connection error:'));
  conn.once('open', () => console.log('db connection open'));
};
