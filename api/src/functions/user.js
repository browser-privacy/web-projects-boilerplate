const connectToDatabase = require('../helpers/db');
const User = require('../models/user');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    User.create(JSON.parse(event.body))
      .then(user =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user),
        }),
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message,
        }),
      );
  });
};
