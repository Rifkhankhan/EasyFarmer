const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Zone = require('../models/Zone');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { username, yourname, address, nic, password, role, mobile, zone } =
		req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ username: username }); // check user is existing or not
	} catch (err) {
		const error = new HttpError('signing up failed ', 500);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError('User Already Exist', 422);
		return next(error);
	}

	const haspassword = await bcrypt.hash(password, 12);
	const hasNic = await bcrypt.hash(nic, 12);

	const newUser = new User({
		username: username,
		yourname: yourname,
		address: address,
		nic: hasNic,
		password: haspassword,
		role: role,
		mobile: mobile,
		zone: zone
	});

	try {
		await newUser.save();
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{ userId: newUser.id, username: newUser.username },
			'projectgreen',
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}
	res.status(200).json({
		message: 'Sign up Successfully',
		data: { userId: newUser.id, username: newUser.username, token: token }
	});
};

const signIn = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
		// return next(new HttpError('Invalid inputs passed, please check your data.', 422)); // batter to use this
	}

	const { username, password } = req.body;

	let identifyUser;
	try {
		identifyUser = await User.findOne({ username: username });
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!identifyUser) {
		const error = new HttpError('UserName or Password is not Valid', 422);
		return next(error);
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, identifyUser.password);
	} catch (err) {
		const error = new HttpError('Password is not Valid', 422);
		return next(error);
	}

	if (!isValidPassword) {
		const error = new HttpError(
			'Invalid Credential ,could not log you in',
			422
		);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: identifyUser.id,
				username: identifyUser.username,
				token: token
			},
			'projectgreen',
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError('signing in failed could not save ', 500);
		return next(error);
	}

	res.status(200).json({
		message: 'SignIn Successfully',
		data: {
			userId: identifyUser.id,
			username: identifyUser.username,
			token: token,
			role: identifyUser.role,
			expiresIn: '1h'
		}
	});
};

const updatePassword = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
		// return next(new HttpError('Invalid inputs passed, please check your data.', 422)); // batter to use this
	}

	const { currentPassword, newPassword, userId } = req.body;

	let validCurrentPassword = false;
	let user;

	try {
		user = await User.findById(userId);
	} catch (err) {
		const error = new HttpError('User is not there provided by the id', 500);
		return next(error);
	}
	console.log(user);
	try {
		validCurrentPassword = await bcrypt.compare(currentPassword, user.password);
		console.log(validCurrentPassword);
	} catch (err) {
		const error = new HttpError('Something went Wrong in Comparing', 500);
		return next(error);
	}

	console.log(validCurrentPassword);
	if (!validCurrentPassword) {
		res;
	}
	let hasNewPassword;
	try {
		hasNewPassword = await bcrypt.hash(newPassword, 12);
	} catch (err) {
		const error = new HttpError('User is not there provided by the id', 500);
		return next(error);
	}

	user.password = hasNewPassword;

	try {
		await user.save();
	} catch (err) {
		const error = new HttpError('Updated Password is not saved ', 500);
		return next(error);
	}

	res.status(200).json({
		message: 'Updated Password Successfully',
		user: user.toObject({ getters: true })
	});
};

const addZone = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
		// return next(new HttpError('Invalid inputs passed, please check your data.', 422)); // batter to use this
	}
	const { zoneEnglish, zoneTamil } = req.body;

	const newZone = new Zone({
		zoneEnglish: zoneEnglish,
		zoneTamil: zoneTamil
	});
	try {
		await newZone.save();
	} catch (err) {
		const error = new HttpError('Creating Zone failed,try again', 500);
		return next(error);
	}
	res.json({ zone: newZone.toObject({ getters: true }) });
};

const getZones = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	let zones;
	try {
		zones = await Zone.find();
	} catch (err) {
		const error = new HttpError('Creating Notification failed,try again', 500);
		return next(error);
	}
	res.json({ zones: zones.map((zone) => zone.toObject({ getters: true })) });
};

exports.getZones = getZones;
exports.addZone = addZone;
exports.updatePassword = updatePassword;
exports.signUp = signUp;
exports.signIn = signIn;
