const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

// eslint-disable-next-line
module.exports = connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  return mongoose
    .connect(
      process.env.MONGO_HOST,
      { useCreateIndex: true, useNewUrlParser: true },
    )
    .then(db => {
      isConnected = db.connections[0].readyState;
    });
};
