const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const error = new Error('Failed to authenticate');
        error.status = 401;
        next(error);
      } else {
        const { _doc: { _id: id } } = decoded;
        User.findById(id).then(user => {
          if (!user) {
            const err = { status: 404, message: 'No such user' };
            throw err;
          }

          const { username, _id } = user;
          req.currentUser = { username, _id };

          return next();
        })
        .catch(err => next(err));
      }
    });
  } else {
    const error = new Error('Failed to authenticate');
    error.status = 401;
    next(error);
  }
};
