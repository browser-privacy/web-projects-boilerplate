const async = require('async');
const axios = require('axios');
const querystring = require('querystring');

const connectToDatabase = require('../helpers/db');
const User = require('../models/user');
const auth = require('../lib/auth');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const submitedValues = JSON.parse(event.body);
  const newUser = {
    email: submitedValues.email,
    username: submitedValues.username,
    password: submitedValues.password,
  };

  async.series(
    [
      cb => {
        axios
          .post(
            'https://google.com/recaptcha/api/siteverify',
            querystring.stringify({
              secret: process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY,
              response: submitedValues.recaptcha,
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
              Promise.all([
                auth.createAccessToken(user),
                auth.createRefreshToken(user),
              ]).then(tokens => {
                cb(null, {
                  access_token: tokens[0],
                  refresh_token: tokens[1],
                });
              });
            })
            .catch(err => cb(err));
        });
      },
      cb => {
        // @TODO: Send email verification
        cb(null);
      },
    ],
    (err, res) => {
      console.log(res);
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
        body: JSON.stringify(res[1]),
      });
    },
  );
};

module.exports.isEmailConfirmed = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const submitedValues = JSON.parse(event.body);
  const { _id } = submitedValues;

  connectToDatabase().then(() => {
    User.findOne({ _id })
      .select('-_id isEmailConfirmed')
      .then(user => {
        if (!user)
          return callback(null, {
            statusCode: 404,
            headers: { 'Content-Type': 'text/plain' },
          });

        return callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(user.isEmailConfirmed),
        });
      })
      .catch(err => {
        callback(null, {
          statusCode: err.status || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || '',
        });
      });
  });
};
