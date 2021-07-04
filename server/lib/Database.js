const mongoose = require('mongoose');
require('dotenv').config();

exports.init = function () {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    const conn = mongoose.connection;
    mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser: true, useUnifiedTopology: true});
    conn.on('error', (err) => reject(err));
    conn.once('open', () => resolve());
  });
};
