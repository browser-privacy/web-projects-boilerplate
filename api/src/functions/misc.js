const axios = require('axios');
const querystring = require('querystring');

module.exports.contact = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const receivedFormDetails = JSON.parse(event.body);

  axios
    .post(
      'https://google.com/recaptcha/api/siteverify',
      querystring.stringify({
        secret: process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY,
        response: receivedFormDetails.recaptchaResponse,
      }),
    )
    .then(response => {
      const recaptchaVerifyResponse = response.data;
      if (!recaptchaVerifyResponse.success)
        return callback(null, {
          statusCode: 403,
          body: JSON.stringify({
            message: '',
          }),
        });

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: '',
        }),
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: err.message,
        }),
      });
    });
};
