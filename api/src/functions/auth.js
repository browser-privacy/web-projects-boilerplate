const connectToDatabase = require('../helpers/db');
const auth = require('../lib/auth');

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
        if (err.message === 'authentication_error') statusCode = 401;
        if (err.message === 'account_banned') statusCode = 403;

        callback(null, {
          statusCode,
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

module.exports.getRandNumber = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      res: `a ${Math.random() * 100}`,
    }),
  };

  callback(null, response);
};

module.exports.getRandNumberFoo = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      res: `b ${Math.random() * 100}`,
    }),
  };

  callback(null, response);
};
