const multer = require('multer');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const path = require('path');
const Jimp = require('jimp');
const shortId = require('shortid');
const {isAuth, checkOwnsProfile} = require('../middlewares/auth');
const fs = require('fs');

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

router.patch('/settings/privacy', isAuth, (req,res) => {
	const { _id } = req.user;
	
	User.findById(_id)
		.then(user => {
			user.openProfile = !user.openProfile;
			return user.save();
		})
		.then(updatedUser => {
			res.status(200).send({
				code: 200,
				message: 'Privacy updated',
				response: updatedUser
			});
		})
		.catch(e => res.status(500).send({ code: 500, message: 'Unexpected error'}));
});

router.post('/:username/edit/info/description', isAuth, (req,res) => {
	const { username } = req.params;
	const { description } = req.body;
	if(req.user.username != username)
		return res.status(401).json({ code: 401, response: "Unauthorized request"});

	if(description.length > 150)
		return res.status(400).json({code: 400, message: "Your description can't have more than 150 characters"})

	User.findOneAndUpdate({ username }, { description: description }, { new: true, useFindAndModify: false })
		.then(updatedUser => res.status(200).json(
			{
				code: 200,
				response: {
					message: 'Descripcion cambiada con exito',
					newDescription: updatedUser.description,
					updatedUser
				}
			})
		)
		.catch(e => res.status(500).send(e));
})

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..' , 'public/images/avatars'))
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.username}.png`);
  }
})

const upload = multer({storage: storage});

router.post('/:username/edit/info/profilePicture', [isAuth, checkOwnsProfile, upload.single('newImage')] , (req,res) => {
	const { username } = req.params;

	if(!req.file)
		res.status(500).json({code: 500, response: "There were an error"});

	const { x, y, width, height } = JSON.parse(req.body.crop);

	Jimp.read(path.resolve(req.file.destination,req.file.filename), (err, imageToCrop) => {
		if (err) throw err;
		imageToCrop
			.crop( x, y, width, height )
			.resize(150,150)
			.quality(100)
			.write(path.resolve(req.file.destination,req.file.filename)); // save
	});

	User.findOneAndUpdate({ username }, { profilePic: `images/avatars/${req.file.filename}` }, { new: true, useFindAndModify: false })
		.then(updatedUser => {
			res.status(200).json(
				{
					code: 200,
					response: {
						message: 'Foto cambiada con exito',
						path: `${updatedUser.profilePic}?hash=${shortId.generate()}`,
						updatedUser
					}
				}
			)
		})
		.catch(e => res.status(500).send(e));
})

module.exports = router;
