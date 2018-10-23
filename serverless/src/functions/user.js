const async = require('async');
const axios = require('axios');
const querystring = require('querystring');
const connectToDatabase = require('../helpers/db');
const User = require('../models/user');
const auth = require('../lib/auth');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const receivedSubmitedValues = JSON.parse(event.body);
  const newUser = {
    email: receivedSubmitedValues.email,
    username: receivedSubmitedValues.username,
    password: receivedSubmitedValues.password,
  };

  let createdUser;
  async.series(
    [
      cb => {
        axios
          .post(
            'https://google.com/recaptcha/api/siteverify',
            querystring.stringify({
              secret: process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY,
              response: receivedSubmitedValues.recaptcha,
            }),
          )
          .then(response => {
            const recaptchaVerifyResponse = response.data;
            if (!recaptchaVerifyResponse.success)
              return cb(new Error('google_recaptcha_error'));

            return cb(null);
          })
          .catch(err => {
            cb(err);
          });
      },
      cb => {
        connectToDatabase().then(() => {
          User.create(newUser)
            .then(user => {
              createdUser = user;
              cb(null);
            })
            .catch(err => cb(err));
        });
      },
      cb => {
        Promise.all([
          auth.createAccessToken(createdUser),
          auth.createRefreshToken(createdUser),
        ]).then(tokens => {
          cb(null, {
            access_token: tokens[0],
            refresh_token: tokens[1],
          });
        });
      },
    ],
    (err, res) => {
      let errStatusCode;
      let errMsg;

      if (err && err.name === 'ValidationError') {
        errStatusCode = 400;
        errMsg = JSON.stringify(err.errors);
      }
      if (err && err.message === 'google_recaptcha_error') {
        errStatusCode = 403;
      }

      if (err)
        return callback(null, {
          statusCode: errStatusCode || err.status,
          headers: { 'Content-Type': 'text/plain' },
          body: errMsg || err.message,
        });

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res[2]),
      });
    },
  );
};
