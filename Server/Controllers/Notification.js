const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Notification = require('../models/Notification');

const createNotification = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}
	const newNotification = new Notification({
		date: new Date().toISOString(),
		userId: req.body.userId,
		reply: req.body.reply,
		message: req.body.message
	});

	try {
		await newNotification.save();
	} catch (err) {
		const error = new HttpError('Creating Notification failed,try again', 500);
		return next(error);
	}
	res.json({ Notification: newNotification.toObject({ getters: true }) });
};

const getNotificationByUserId = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	// const cropName = req.params.cropName;
	const { userId } = req.body;
	let notifications;

	try {
		notifications = await Notification.find({ userId: userId });
		console.log(notifications);
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!notifications || notifications.length === 0) {
		res.status(201).json({ message: 'There is no Notification' });
	}

	res.status(200).json({
		notifications: notifications.map((notification) =>
			notification.toObject({ getters: true })
		)
	});
};

const getNotification = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { notificationId } = req.params;
	let notification;
	try {
		notification = await Notification.findById(notificationId);
	} catch (err) {
		const error = new HttpError(
			'finding notification failed bt id,try again',
			500
		);
		return next(error);
	}

	if (!notification) {
		const error = new HttpError('finding notification failed,try again', 500);
		return next(error);
	}
	console.log(notification);
	return res.status(201).json(notification.toObject({ getters: true }));
};

const updateNotification = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { userId, message, notificationId } = req.body;

	let notification;
	try {
		notification = await Notification.findById(notificationId);
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	notification.date = new Date().toISOString();
	notification.message = message;
	notification.userId = userId;
	notification.reply = false;

	try {
		await notification.save();
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	console.log(notification);
	res
		.status(201)
		.json({ notification: notification.toObject({ getters: true }) });
};

const replyNotification = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { userId, message, notificationId, replyMessage, date } = req.body;

	let notification;
	try {
		notification = await Notification.findById(notificationId);
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	notification.date = date;
	notification.message = message;
	notification.userId = userId;
	notification.reply = true;
	notification.replyDate = new Date().toISOString();
	notification.replyMessage = replyMessage;

	try {
		await notification.save();
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	console.log(notification);
	res
		.status(201)
		.json({ notification: notification.toObject({ getters: true }) });
};

const deleteNotification = async (req, res, next) => {
	const notificationId = req.params.notificationId;
	let notification;
	try {
		notification = await Notification.findById(notificationId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}

	try {
		await notification.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted User' });
};

const getAllNotifications = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	let notifications;
	try {
		notifications = await Notification.find();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}

	res.json({
		notifications: notifications.map((notification) =>
			notification.toObject({ getters: true })
		)
	});
};

exports.getAllNotifications = getAllNotifications;
exports.getNotification = getNotification;
exports.getNotificationByUserId = getNotificationByUserId;
exports.createNotification = createNotification;
exports.updateNotification = updateNotification;
exports.deleteNotification = deleteNotification;
exports.replyNotification = replyNotification;
