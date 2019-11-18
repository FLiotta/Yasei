const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', (req,res) => {	
	User.countDocuments()
		.exec((err, count) => {
			if(err)
				return res.status(500).send('There were an error counting the users');
		  const random = Math.floor(Math.random() * (count - 6))
		  User.find({})
		  	.limit(6)
		  	.skip(random)
		  	.exec((err, result) => {
		  		if(err) 
		  			return res.status(500).json({
		  				message: 'There were an error fetching the users',
		  				error: err
		  			});		  		

		      	res.status(200).json({
		      		code: 200,
		      		response: [...result]
		      	});
		    })
		});
});

module.exports = router;