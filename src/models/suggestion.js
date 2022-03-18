const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
	name: { type: String, required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	institution_id: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
	},
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
