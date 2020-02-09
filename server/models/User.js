const mongoose = require('mongoose');
const { Schema } = mongoose;

const getRandomProfilePicture = () => `/images/avatars/default/avatar_default_${Math.floor((Math.random() * 5) + 0)}.png`;

const userSchema = new Schema({
	username: String,
	password: {type: String, select: false},
	verified: {type: Boolean, default: false},
	description: {type: String, default: ''},
	profilePic: {type: String, default: getRandomProfilePicture}
});

userSchema.methods.findByUsername = (name, cb) => {
	    return this.model('User').find({ username: name }, cb);
}

const user = mongoose.model('user', userSchema);

module.exports = user;
