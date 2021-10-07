const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HallSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Hall', HallSchema);
