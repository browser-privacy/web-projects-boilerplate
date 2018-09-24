/* eslint no-underscore-dangle: 0 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');

const loginUser = (userIdentifier, password) =>
  new Promise((res1, rej1) =>
    User.findOne({
      $or: [{ email: userIdentifier }, { username: userIdentifier }],
    })
      .then(user => {
        if (!user) return rej1(new Error('authentication_error'));

        return new Promise((res2, rej2) => {
          bcrypt.compare(password, user.password, (err, success) => {
            if (err) return rej2(err);
            if (!success) return rej2(new Error('authentication_error'));

            return res1(user);
          });
        });
      })
      .catch(rej1),
  );

const createAccessToken = user =>
  jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: 60 * 11,
  });

const createRefreshToken = user => {
  const refreshToken = jwt.sign({ type: 'refresh' }, process.env.JWT_SECRET, {
    expiresIn: '30 days',
  });

  const newRefreshToken = new RefreshToken({
    _user: user._id,
    token: refreshToken,
  });

  return newRefreshToken
    .save()
    .then(() => refreshToken)
    .catch(err => {
      throw err;
    });
};

const validateRefreshToken = refreshToken =>
  new Promise((res, rej) => {
    jwt.verify(refreshToken, process.env.JWT_SECRET, (jwtErr, decoded) => {
      if (jwtErr || decoded.type !== 'refresh')
        return rej(new Error('authentication_error'));

      return RefreshToken.findOneAndUpdate(
        { token: refreshToken, isActive: true },
        { lastUseAt: Date.now() },
      )
        .then(validRefreshToken => {
          if (!validRefreshToken) return rej(new Error('authentication_error'));

          const refreshTokenUser = { _id: validateRefreshToken._id };
          return res(refreshTokenUser);
        })
        .catch(err => {
          rej(err);
        });
    });
  });

module.exports = {
  loginUser,
  createAccessToken,
  createRefreshToken,
  validateRefreshToken,
};
