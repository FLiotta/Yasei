const mongoose = require('mongoose');
const User = require('./User');
const { Schema } = mongoose;

const postSchema = new Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: User},
	profile: String,
	message: String,
	extra: {
		type: {
			value: String,
			extraType: String
		}
	},
	likes: {type: Number, default: 0},
	likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: User}],
	createdAt: {type: Date, default: Date.now}
});

const post = mongoose.model('post', postSchema);

module.exports = post;