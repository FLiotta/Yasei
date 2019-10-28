const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const User = require('../models/User');
const router = express.Router();

router.post('/sign-up', (req,res) => {
	const { email, username, password } = req.body;

	if(!email || !username || !password)
		res.status(400).send('You must provide all the information');

	bcrypt.genSalt(5)
		.then(salt => bcrypt.hash(password, salt))
		.then(hashPassword => new User({email, username, password: hashPassword}).save())
		.then(newUser => {

			const token = jwt.sign(
				{
					data: newUser,
					exp: Math.floor(Date.now() / 1000) + (60 * 60)
				}, SECRET_KEY)

			res.status(200).json({
				code: 200, 
				response: {
					token,
					username: newUser.username,
					email: newUser.email,
					profilePic: newUser.profilePic
				}
			})
		})
		.catch(e => res.send(500).json({error: 'There were an error.'}));
});

router.post('/sign-in', (req,res) => {
	const { username, password } = req.body;

	if(!username || !password)
		res.status(400).json({code: 400, message: 'You must provide all the information'})

	User.findOne({username})
		.select('+password')
		.then(user => {			
			if(!user)
				res.status(404).json({code: 404, message: 'User not found'})

			bcrypt.compare(password, user.password)
				.then(successLogged => !successLogged ? res.status(403).json({code: 403, message: 'Invalid password'}) : user)
				.then(user => 
					jwt.sign({
						data: user,
						exp: Math.floor(Date.now() / 1000) + (60 * 60)
					}, SECRET_KEY))
				.then(token => res.status(200).json({
					code: 200,
					response: {
						token,
						username: user.username,
						email: user.email,
						profilePic: user.profilePic
					}
				}))
				.catch(e => res.send(500).json({error: 'There were an error.'}));
		})	
		.catch(e => res.send(500).json({error: 'There were an error.'}));
})

module.exports = router;
