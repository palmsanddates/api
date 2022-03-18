const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
	role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
	institution_id: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
	},
	name: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	hall: { type: Schema.Types.ObjectId, ref: 'Hall', required: false },
	img_url: { type: String, required: false },
	bio: { type: String, required: false },
	hometown: { type: String, required: false },
});

UserSchema.pre('save', async function save(next) {
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (err) {
		return next(err);
	}
});

UserSchema.methods.validatePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
