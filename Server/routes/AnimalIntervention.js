const express = require('express');
var router = express.Router();
var interventionController = require('../Controllers/AnimalIntervention');
var fileUpload = require('../Middleware/interventionFile-upload');
const multer = require('multer');

router.get(
	'/interventions/:interventionId',
	interventionController.getIntrevention
);
router.get(
	'/:cropName',
	interventionController.getInterventionByCropName
);

router.patch(
	'/cropInterventions/update/:interventionId',
	interventionController.updateInterventionByCropName
);
router.delete(
	'/cropInterventions/delete/:interventionId',
	interventionController.deleteInterventionByCropName
);

router.post(
	'/createIntervention',
	fileUpload.single('image'),
	interventionController.createIntervention
);

module.exports = router;
