const express = require('express');
const bodyParser = require('body-parser');

const userService = require('../../service/userService');

const tokenAuthentication = require('../../middleware/tokenAuthentication');


const userRoute = express.Router();

userRoute.post('/register',
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		userService.createUser(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a new user registered.");
			})
			.catch(err => next(err));
	}
);

userRoute.post('/log_in',
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		userService.logIn(req.body)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user logged in.");
			})
			.catch(err => next(err));
	}
);

userRoute.post('/add_email',
	tokenAuthentication,
	bodyParser.urlencoded({extended: false}),
	(req, res, next) => {
		let params = req.body;
		params.user_id = req.user.id;
		userService.addEmail(params)
			.then((results) => {
				res.json({result: 'success', data: results});
				console.log("a user added an user_email.");
			})
			.catch(err => next(err));
	}
);


module.exports = userRoute;
