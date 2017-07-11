const express = require('express');
const User = require('../../../models/user');
const co = require('co');
const loginValidator = require('../../../shared/validations/login');
const signupValidator = require('../../../shared/validations/signup');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  const { isValid, errors } = signupValidator(req.body);

  if (!isValid) {
    return res.status(400).json({ error: true, errors });
  }

  co(function* () {
    const existingUser = yield User.findOne({ username });

    if (existingUser) {
      const error = { status: 400, errors: { username: 'Username already exists' } };
      throw error;
    }

    const user = new User({ username, password });
    return user.save();
  })
  .then(user => res.json({ username: user.username, access_token: user.access_token }))
  .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const { isValid, errors } = loginValidator(req.body);

  if (!isValid) {
    return res.status(400).json({ error: true, errors });
  }

  co(function* () {
    const user = yield User.findOne({ username });
    if (!user) {
      const error = { status: 401, errors: { username: 'Invalid username' } };
      throw error;
    }

    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
      const error = { status: 401, errors: { password: 'Invalid password' } };
      throw error;
    }

    return user;
  })
  .then(user => res.json({ username: user.username, access_token: user.access_token }))
  .catch(err => next(err));
});

module.exports = router;

