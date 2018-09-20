const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

// eslint-disable-next-line
module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect(process.env.MONGO_HOST).then(db => {
    isConnected = db.connections[0].readyState;
  });
};
