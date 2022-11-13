const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const animalInterventionSchema = new Schema({
	about: { type: String, required: true },
	cropName: { type: String, required: true },
	interventionName: { type: String, required: true, unique: true },
	image: { type: String, required: true },
	whyIsImportant: { type: String, required: true },

	whatIdDoes: { type: String, required: true },
	whyAndWhereItOccours: { type: String, required: true },
	howToIdentify: { type: String, required: true },
	howToManage: { type: String, required: true },
});

// cropDiseaseSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('AnimalIntervention', animalInterventionSchema);
