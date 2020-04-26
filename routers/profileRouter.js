const express = require('express');

var router = express.Router();
const controller = require('../controllers/profileController');
const uploadController = require('../controllers/uploadController');
const uploadMulter = require('../models/ModelMulter');

router.get('/', controller.getProfile);

router.get('/avatar', controller.getAvatar);

router.post('/avatar', uploadMulter.single("avatar"), uploadController.uploadSingleFile, controller.postAvatar);

module.exports = router;