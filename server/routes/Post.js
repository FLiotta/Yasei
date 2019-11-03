const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/:id/like', (req,res) => {
	const { id } = req.params;

	if(!req.user)
		res.status(403).json({code: 403, response: "Unauthorized request"});

	const query = {
		_id: id, 
		likedBy: { 
			"$nin": req.user._id 
		}
	}

	const newValues = { 
		$push: {
			likedBy: req.user._id
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

router.post('/:id/unlike', (req,res) => {
	const { id } = req.params;

	if(!req.user)
		res.status(403).json({code: 403, response: "Unauthorized request"});

	const query = {
		_id: id, 
		likedBy: { 
			"$in": req.user._id 
		}
	};

	const newValues = { 
		$pull: {
			likedBy: req.user._id
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