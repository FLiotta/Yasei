const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	username: String,
	password: {type: String, select: false},
	verified: {type: Boolean, default: false},
	description: {type: String, default: ''},
	profilePic: {type: String, default: `/assets/images/avatar_default_${Math.floor((Math.random() * 2) + 0)}.png`}
});

userSchema.methods.findByUsername = (name, cb) => {
	    return this.model('User').find({ username: name }, cb);
}

const user = mongoose.model('user', userSchema);

module.exports = user;