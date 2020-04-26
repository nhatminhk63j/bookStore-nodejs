const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/uploadController');

const uploadMulter = require('../models/ModelMulter');

router.post('/single', uploadMulter.single('name'), uploadController.uploadSingleFile);

router.post('/multiple', uploadMulter.any(), uploadController.uploadMultipleFiles);

module.exports = router;