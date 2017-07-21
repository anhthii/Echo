const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const getToken = require('../utils/getTokenForUser');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  access_token: String,
});

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      user.access_token = getToken(user);
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);

      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model('user', userSchema);

