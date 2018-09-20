module.exports.main = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'API OK!',
      evt: event,
    }),
  };

  callback(null, response);
};
