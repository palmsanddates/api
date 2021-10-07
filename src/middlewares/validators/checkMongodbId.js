const mongoose = require('mongoose');

const checkMongodbId = (value, { req }) => {
  return mongoose.Types.ObjectId.isValid(value);
};

module.exports = checkMongodbId;
