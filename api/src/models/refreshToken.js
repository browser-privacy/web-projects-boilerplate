const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * refreshToken Schema
 */
const RefreshTokenSchema = new mongoose.Schema({
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
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUseAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @typedef refreshToken
 */
module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
