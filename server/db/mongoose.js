const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(MONGO_URI, config);

module.exports = mongoose;