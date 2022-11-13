const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
	date: { type: String, required: true },
	message: { type: String, required: true },
	userId: { type: String, required: true },
	reply: { type: Boolean, required: true },
	replyMessage: { type: String },
	replyDate:{type:String}
});

module.exports = mongoose.model('Notification', notificationSchema);
