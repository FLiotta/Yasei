const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const {isAuth} = require('../middlewares/auth');

router.post('/:id/like', isAuth, (req,res) => {
	const { id } = req.params;

	if(!req.user)
		res.status(403).json({code: 403, response: "Unauthorized request"});

	const query = {
		_id: id,
		likedBy: {
			"$nin": req.user.username
		}
	}

	const newValues = {
		$push: {
			likedBy: req.user.username
		},
		$inc: {
			likes: 1
		}
	}

	Post.findOneAndUpdate(query, newValues , { new: true })
		.then(likedPost => {
			if(!likedPost)
				return res.status(403).json({code: 403, response: "You already liked this post"});
			res.status(200).json({code: 200, response: likedPost})
		})
		.catch(e => res.status(500).send("There were an error"));
});

router.post('/:id/unlike', isAuth, (req,res) => {
	const { id } = req.params;

	if(!req.user)
		res.status(403).json({code: 403, response: "Unauthorized request"});

	const query = {
		_id: id,
		likedBy: {
			"$in": req.user.username
		}
	};

	const newValues = {
		$pull: {
			likedBy: req.user.username
		},
		$inc: {
			likes: -1
		}
	};

	Post.findOneAndUpdate(query, newValues, { new: true })
		.then(unlikedPost => {
			if(!unlikedPost)
				return res.status(403).json({code: 403, response: "You haven't liked this post yet"});
			res.status(200).json({code: 200, response: unlikedPost})
		})
		.catch(e => res.status(500).send("There were an error"));
})

router.get('/:id/delete', isAuth, (req,res) => {
	const { id } = req.params;

	if(!req.user)
		res.status(403).json({code: 403, response: "Unauthorized request"});

	Post.findOneAndDelete({_id: id, $or: [{author: req.user._id}, {profile: req.user.username}]})
		.exec((err, post) => {
			if(err)
				return res.status(500).json({code: 500, message: 'There was an error deleting the post', error: err})
			res.status(200).json({code: 200, message: 'Post deleted', deletedPost: post})
		});
})

router.get('/:id', (req,res) => {
	const { id } = req.params;

	Post.findById(id)
		.then(post =>
			post
				? res.status(200).json({code: 200, response: post})
				: res.status(404).json({code: 404, response: 'Post not found'}))
		.catch(e => res.send(500).json({error: 'There were an error.'}));
});

module.exports = router;
