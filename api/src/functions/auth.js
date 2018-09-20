module.exports.login = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK!',
    }),
  };

  callback(null, response);
};

module.exports.refreshAccessToken = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK!',
    }),
  };

  callback(null, response);
};
