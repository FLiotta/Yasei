const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const {isAuth} = require('../../middlewares/auth');

router.get('/:username', (req,res) => {
	let { username } = req.params;

	User.findOne({username})
		.then(user => {
			if(!user)
				return res.status(404).json({code: 404, response: 'User not found'});

			Promise.all([
				Post.countDocuments({profile: username}),
				Post.countDocuments({likedBy: { $in: username }})
			]).then(([posts, likes]) => {
				res.status(200).send({
					code: 200,
					response: {
						posts,
						likes,
						...user.toObject()
					}
				});
			})
			.catch(e => res.send(500).json({error: 'There was an error.'}));
		})
		.catch(e => res.send(500).json({error: 'There was an error.'}));
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

router.get('/:id/likes', (req,res) => {
	//Search by id to be implemented
	const { username } = req.params;
	Post.find({likedBy: { $in: username }})
		.limit(2)
		.exec((err, posts) => {
			res.send(posts)
		})
		/*.then(res => res.status(200).send(res))
		.catch(e => res.status(500).send("There were an error"));*/
})

router.post('/:username/new/post', isAuth, (req,res) => {
	const { username: profile } = req.params;
	let { message, extra = null } = req.body;
	const { _id: author } = req.user;

	if (extra.value && extra.extraType) {
		extra.value = extra.value.split('=')[1];
	} else {
		extra = null;
	}


	new Post({ author, profile, message, extra })
		.save()
		.then(newPost => {
			Post.populate(newPost, {path: 'author'}, (err, populatedPost) => {
				res.status(200).json({
					code: 200,
					response: populatedPost
				})
			})
		})
		.catch(e => res.status(500).send("We couldn't save your post."));
});

module.exports = router;
