const async = require('async');
const axios = require('axios');
const querystring = require('querystring');

const connectToDatabase = require('../helpers/db');
const auth = require('../lib/auth');
const User = require('../models/user');
const ResetPasswordToken = require('../models/resetPasswordToken');

module.exports.login = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const receivedLoginDetails = JSON.parse(event.body);

  connectToDatabase().then(() => {
    auth
      .loginUser(
        receivedLoginDetails.userIdentifier.trim().toLowerCase(),
        receivedLoginDetails.password,
      )
      .then(user =>
        Promise.all([
          auth.createAccessToken(user),
          auth.createRefreshToken(user),
        ]).then(tokens => ({
          access_token: tokens[0],
          refresh_token: tokens[1],
        })),
      )
      .then(tokens => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
          }),
        });
      })
      .catch(err => {
        let statusCode = 500;
        if (err.message === 'authentication_error') statusCode = 403;
        if (
          err.message === 'account_banned' ||
          err.message === 'account_email_unverified'
        )
          statusCode = 423;

        callback(null, {
          statusCode,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message,
        });
      });
  });
};

module.exports.confirmEmail = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const submitedValues = JSON.parse(event.body);

  connectToDatabase().then(() => {
    User.findOneAndUpdate(
      { emailConfirmationToken: submitedValues.token, isEmailConfirmed: false },
      { isEmailConfirmed: true, emailConfirmatedAt: Date.now() },
    )
      .then(user => {
        if (!user)
          return callback(null, {
            statusCode: 403,
            headers: { 'Content-Type': 'text/plain' },
          });

        return callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain' },
        });
      })
      .catch(err => {
        callback(null, {
          statusCode: err.status || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || null,
        });
      });
  });
};

module.exports.forgotPassword = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const submitedValues = JSON.parse(event.body);

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
          User.findOne({ email: submitedValues.email })
            .select('_id')
            .then(user => {
              if (!user) return cb(null);

              const { _id } = user;

              const newResetPasswordToken = new ResetPasswordToken({
                _user: _id,
              });

              return newResetPasswordToken.save(err => {
                if (err) return cb(err);

                // @TODO: Send email with reset url
                return cb(null);
              });
            })
            .catch(err => cb(err));
        });
      },
    ],
    (err, res) => {
      let errStatusCode;
      let errMsg;

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

module.exports.resetPassword = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const submitedValues = JSON.parse(event.body);

  connectToDatabase().then(() => {
    ResetPasswordToken.findOne({ token: submitedValues.token })
      .populate('_user', '_id password passwordResetedAt')
      .then(passwordToken => {
        if (!passwordToken)
          return callback(null, {
            statusCode: 403,
            headers: { 'Content-Type': 'text/plain' },
          });

        const { _user, used, createdAt } = passwordToken;
        if (used || createdAt < Date.now() - 10 * 60 * 1000)
          return callback(null, {
            statusCode: 403,
            headers: { 'Content-Type': 'text/plain' },
          });

        _user.password = submitedValues.password;
        _user.passwordResetedAt = Date.now();
        return _user.save(() => {
          passwordToken.used = true;
          passwordToken.usedAt = Date.now();
          passwordToken.save(() => {
            // @TODO: Send success password reset email
            callback(null, {
              statusCode: 200,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
        });
      })
      .catch(err => {
        callback(null, {
          statusCode: err.status || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message,
        });
      });
  });
};

module.exports.logout = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    auth
      .invalidateRefreshToken(event.headers['X-REFRESH-TOKEN'])
      .then(() =>
        callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain' },
        }),
      )
      .catch(err => {
        callback(null, {
          statusCode: 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message,
        });
      });
  });
};

module.exports.refreshAccessToken = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const receivedData = JSON.parse(event.body);

  connectToDatabase().then(() => {
    auth
      .validateRefreshToken(receivedData.refreshToken)
      .then(user => auth.createAccessToken(user))
      .then(newAccessToken =>
        callback(null, {
          statusCode: 200,
          body: newAccessToken,
        }),
      )
      .catch(err => {
        let statusCode = 500;
        if (err.message === 'authentication_error') statusCode = 403;

        callback(null, {
          statusCode,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message,
        });
      });
  });
};
