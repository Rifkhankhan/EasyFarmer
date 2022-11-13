const express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/Auth');

router.post('/SignUp', AuthController.signUp);
router.post('/SignIn', AuthController.signIn);
router.post('/updatePassword', AuthController.updatePassword);
router.post('/addZone', AuthController.addZone);
router.get('/getZones', AuthController.getZones);

module.exports = router;
