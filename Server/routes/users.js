const express = require('express');
var router = express.Router();
var TipController = require('../Controllers/Tip');
var profileController = require('../Controllers/Profile');
var fileUpload = require('../Middleware/file-upload');
const multer = require('multer');

router.get('/:userId',profileController.getUser)


module.exports = router;
