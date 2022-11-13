const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const zoneSchema = new Schema({
	zoneEnglish: { type: String, required: true, unique: true },
	zoneTamil: { type: String, required: true, unique: true }
});
zoneSchema.plugin(UniqueValidator);

module.exports = mongoose.model('Zone', zoneSchema);
