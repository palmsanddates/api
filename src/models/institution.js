const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstitutionSchema = new Schema({
	name: { type: String, required: true },
	domain: { type: String, required: true },
});

module.exports = mongoose.model('Institution', InstitutionSchema);
