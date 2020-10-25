const mongoose = require('mongoose');
const shortId = require('shortid');
const User = require('./User');
const { Schema } = mongoose;

const postSchema = new Schema({
  _id: { type: 'String', default: shortId.generate },
  author: { type: mongoose.Schema.Types.ObjectId, ref: User },
  profile: String,
  message: String,
  extra: {
    type: {
      value: String,
      extraType: String
    }
  },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String, ref: User }],
  createdAt: { type: Date, default: Date.now }
});

const post = mongoose.model('post', postSchema);

module.exports = post;
