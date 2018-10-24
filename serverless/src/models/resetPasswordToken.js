const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * resetPasswordToken Schema
 */
const ResetPasswordToken = new mongoose.Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  token: {
    type: String,
    default: null,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

/**
 * @typedef resetPasswordToken
 */
module.exports = mongoose.model('ResetPasswordToken', ResetPasswordToken);
