const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
	name: { type: String, required: true },
	institution_id: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
	},
	events: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Event',
		},
	],
});

module.exports = mongoose.model('Club', ClubSchema);
