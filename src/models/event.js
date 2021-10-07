const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require('../util/autopopulate');

const EventSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bio: { type: String, required: false },
  location: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  flyer_img_url: { type: String, required: false },
  rsvp_url: { type: String, required: false },
  clubs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: false
    },
  ],
});

EventSchema.pre('findOne', Populate('creator')).pre(
  'find',
  Populate('creator')
);

module.exports = mongoose.model('Event', EventSchema);
