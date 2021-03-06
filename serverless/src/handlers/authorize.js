const _ = require('lodash');
const jwt = require('jsonwebtoken');
const aws = require('../lib/aws');

// Returns a boolean whether or not a user is allowed to call a particular method
// call 'arn:aws:execute-api:ap-southeast-1::random-api-id/dev/GET/admin/metrics'
const authorizeUser = (user, methodArn) => {
  // console.log(`authorizeUser ${JSON.stringify(user)} ${methodArn}`);
  if (methodArn.includes('/admin') && !_.includes(user.roles, 'ADMIN'))
    return false;

  return true;
};

/**
 * Authorizer functions are executed before your actual functions.
 * @method authorize
 * @param {String} event.authorizationToken - JWT
 * @throws Returns 401 if the token is invalid or has expired.
 * @throws Returns 403 if the token does not have sufficient permissions.
 */
module.exports.handler = (event, context, callback) => {
  let token = event.authorizationToken;
  if (token) token = token.replace('Bearer ', '');

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { user } = decoded;

    let isAllowed = null;

    if (user.accountStatus !== 'active' || user.isEmailConfirmed === false) {
      isAllowed = false;
    }

    // Checks if the user's scopes allow her to call the current endpoint ARN
    if (isAllowed === null) isAllowed = authorizeUser(user, event.methodArn);

    // Return an IAM policy document for the current endpoint
    const { _id } = user;
    const userIdentifier = _id;

    const effect = isAllowed ? 'Allow' : 'Deny';
    const authorizerContext = { user: JSON.stringify(user) };
    const policyDocument = aws.buildIAMPolicy(
      userIdentifier,
      effect,
      event.methodArn,
      authorizerContext,
    );

    callback(null, policyDocument);
  } catch (e) {
    callback('authentication_error');
  }
};
