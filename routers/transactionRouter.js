const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController')

router.get('/', controller.index);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

router.get('/:id/complete', controller.complete);

module.exports = router;