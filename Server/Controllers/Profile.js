const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const userId = req.params.userId;

	let user;
	try {
		user = await User.findById(userId); // check user is existing or not
	} catch (err) {
		const error = new HttpError('Getting User failed ', 500);
		return next(error);
	}

	res.status(200).json({
		data: { user: user.toObject({ getters: true }) }
	});
};

exports.getUser = getUser;
