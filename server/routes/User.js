const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/:username', (req,res) => {
	const { username } = req.params;

	User.findOne({username})
		.then(user => 
			user 
				? res.status(200).json({code: 200, response: user})
				: res.status(404).json({code: 404, response: 'User not found'}))
		.catch(e => res.send(500).json({error: 'There were an error.'}));

});

router.get('/:username/posts', (req,res) => {
	const { username: profile } = req.params;
	const { offset = 0, quantity = 20 } = req.query;

	Post.find({profile})			
		.skip(parseInt(offset))
		.limit(parseInt(quantity))
		.sort('-createdAt')
		.populate('author')
		.exec((err, posts) => {
			if(err)
				return res.status(500).send("There were an error")
			res.status(200).json({
				code: 200,
				response: posts
			})
		});
})

router.post('/:username/new/post', (req,res) => {
	const { username: profile } = req.params;
	const { message } = req.body;
	const { _id: author } = req.user;

	new Post({ author, profile, message })
		.save()
		.then(newPost => {
			Post.populate(newPost, {path: 'author'}, (err, populatedPost) => {
				res.status(200).json({
					code: 200,
					response: populatedPost
				})
			})			
		})
		.catch(e => res.status(500).send("There were an error"));
})


module.exports = router;