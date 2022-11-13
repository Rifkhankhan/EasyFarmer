const express = require('express'); 
var router = express.Router();
var notificationController = require('../Controllers/Notification');

router.post('/create', notificationController.createNotification);
router.delete('/delete/:notificationId', notificationController.deleteNotification);
router.patch('/update', notificationController.updateNotification);
router.patch('/reply', notificationController.replyNotification);
router.get('/notification/:notificationId', notificationController.getNotification);
router.post('/:userId', notificationController.getNotificationByUserId);
router.get('/', notificationController.getAllNotifications);

module.exports = router;
