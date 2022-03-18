const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstitutionSchema = new Schema({
	name: { type: String, required: true },
	domain: { type: String, required: true },
	clubs: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Club',
		},
	],
});

module.exports = mongoose.model('Institution', InstitutionSchema);
