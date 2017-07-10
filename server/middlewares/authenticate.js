const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const err = { status: 401, message: 'Failed to authenticate' };
        next(err);
      } else {
        const { _doc: { _id: id } } = decoded;

        User.findById(id).then(user => {
          if (!user) {
            const err = { status: 404, message: 'No such user' };
            throw err;
          }

          req.currentUser = user;
          next();
        })
        .catch(err => next(err));
      }
    });
  }
};
