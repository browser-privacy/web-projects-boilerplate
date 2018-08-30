module.exports.create = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK!',
    }),
  };

  callback(null, response);
};
