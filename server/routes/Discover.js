const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', (req,res) => {	
	User.count()
		.exec((err, count) => {
			if(err)
				return res.status(500).send('There were an error');
		  const random = Math.floor(Math.random() * count)
		  User.find({})
		  	.limit(6)
		  	.skip(random)
		  	.exec((err, result) => {
		  		if(err)
		  			return res.status(500).send('There were an error');

		      	res.status(200).json({
		      		code: 200,
		      		response: [...result]
		      	});
		    })
		});
});

module.exports = router;