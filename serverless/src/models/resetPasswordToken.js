const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuidv4 = require('uuid/v4');

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
    unique: true,
    index: true,
    default: () => uuidv4(),
  },
  used: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  usedAt: {
    type: Date,
    default: null,
  },
});

/**
 * @typedef resetPasswordToken
 */
module.exports = mongoose.model('ResetPasswordToken', ResetPasswordToken);
